import { Component, OnInit } from '@angular/core';
import { ContractService } from '@services/ContractService';
import { MatDialog } from '@angular/material/dialog';
import { ContractDialogComponent } from '../../../components/contract-dialog/contract-dialog.component';
import { Contract } from '@models/contract';

@Component({
  selector: 'app-contracts-d',
  templateUrl: './contracts-d.component.html',
  styleUrls: ['./contracts-d.component.css'],
})
export class ContractsDComponent implements OnInit {
  offerContracts: Contract[];
  pendingContracts: Contract[];
  historyContracts: Contract[];
  offerContract: Contract;
  pendingContract: Contract;
  user_id: any;

  constructor(
    private contractService: ContractService,
    public dialog: MatDialog
  ) {
    this.offerContracts = [] as Contract[];
    this.pendingContracts = [] as Contract[];
    this.historyContracts = [] as Contract[];
    this.offerContract = {} as Contract;
    this.pendingContract = {} as Contract;
  }

  acceptContract(contract: Contract): void {
    this.contractService.changeContractStatus(contract, 'PENDING').subscribe();

    this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message:
          'The contract has been signed. When you finish the work, we will pay you',
      },
    });

    this.ngOnInit();
  }

  declineContract(contract: Contract): void {
    this.contractService.changeContractVisibility(contract);

    // const dialogRef = this.dialog.open(ContractDialogComponent, {
    this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message: 'You turned down the job offer',
      },
    });

    this.ngOnInit();
    this.ngOnInit();
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.contractService
      .getOfferContracts(this.user_id)
      .subscribe((response) => {
        this.offerContracts = response;
        this.offerContracts = this.filterContracts(this.offerContracts);
      });

    this.contractService
      .getPendingContracts(this.user_id, 'carrier')
      .subscribe((response) => {
        this.pendingContracts = response;
        this.pendingContracts = this.filterContracts(this.pendingContracts);
      });

    this.contractService
      .getHistoryContracts(this.user_id, 'carrier')
      .subscribe((response) => {
        this.historyContracts = response;
        this.historyContracts = this.filterContracts(this.historyContracts);
      });
  }

  filterContracts = (contracts: Contract[]) => {
    let filterContracts: Contract[] = [] as Contract[];

    contracts.forEach((element: any) => {
      if (element.visible === true) {
        filterContracts.push(element);
      }
    });

    return filterContracts;
  };
}
