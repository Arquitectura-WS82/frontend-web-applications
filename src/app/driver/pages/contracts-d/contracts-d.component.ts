import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractDialogComponent } from '../../../components/contract-dialog/contract-dialog.component';
import { OfferContract } from 'src/app/models/contracts/offer';
import { PendingContract } from 'src/app/models/contracts/pending';

@Component({
  selector: 'app-contracts-d',
  templateUrl: './contracts-d.component.html',
  styleUrls: ['./contracts-d.component.css'],
})
export class ContractsDComponent implements OnInit {
  public offerContracts: any = [];
  public pendingContracts: any = [];
  public historyContracts: any = [];
  offerContract: OfferContract;
  pendingContract: PendingContract;
  user_id: any;

  constructor(
    private contractsService: ContractsService,
    public dialog: MatDialog
  ) {
    this.offerContract = {} as OfferContract;
    this.pendingContract = {} as PendingContract;
  }

  acceptContract(id: number): void {
    this.contractsService
      .changeContractStatusOfferToPending(id, this.user_id)
      .subscribe((response) => {
        console.log(response);
      });
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message:
          'The contract has been signed. When you finish the work, we will pay you',
      },
    });
    this.ngOnInit();
  }
  declineContract(id: number): void {
    this.contractsService
      .changeContractVisibleToFalse(id)
      .subscribe((response) => {
        console.log(response);
      });
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message: 'You turned down the job offer',
      },
    });
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.contractsService
      .getOfferContracts(this.user_id)
      .subscribe((response) => {
        this.offerContracts = response;
        this.offerContracts = this.filterContracts(this.offerContracts);
        console.log(this.offerContracts);
      });
    this.contractsService
      .getPendingContracts(this.user_id)
      .subscribe((response) => {
        this.pendingContracts = response;
        this.pendingContracts = this.filterContracts(this.pendingContracts);
      });
    this.contractsService
      .getHistoryContracts(this.user_id)
      .subscribe((response) => {
        this.historyContracts = response;
        this.historyContracts = this.filterContracts(this.historyContracts);
      });
  }

  filterContracts = (contracts: any) => {
    let filterContracts: any = [];
    contracts.forEach((element: any) => {
      if (element.visible === true) {
        filterContracts.push(element);
      }
    });
    return filterContracts;
  };
}
