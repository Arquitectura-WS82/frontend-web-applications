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
    this.contractsService.getOfferContractById(id).subscribe((response) => {
      this.offerContract = response;
      console.log(this.offerContract);
      this.pendingContract.clientId = this.offerContract.clientId;
      this.pendingContract.driverId = this.offerContract.driverId;
      this.pendingContract.subject = this.offerContract.subject;
      this.pendingContract.from = this.offerContract.from;
      this.pendingContract.to = this.offerContract.to;
      this.pendingContract.date = this.offerContract.date;
      this.pendingContract.timeDeparture = this.offerContract.timeDeparture;
      this.pendingContract.timeArrival = this.offerContract.timeArrival;
      this.pendingContract.quantity = this.offerContract.quantity;
      this.pendingContract.amount = this.offerContract.amount;
      this.pendingContract.status = this.offerContract.status;
      this.contractsService.removeOfferContract(id).subscribe((response) => {
        console.log(response);
      });
      this.contractsService
        .addPendingContract(this.pendingContract)
        .subscribe((response) => {
          console.log(response);
        });
    });
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message:
          'The contract has been signed. When you finish the work, we will pay you',
      },
    });
  }
  declineContract(id: number): void {
    this.contractsService.getOfferContractById(id).subscribe((response) => {
      this.offerContract = response;
      console.log(this.offerContract);
      this.offerContract.status = 'rejected';
      this.contractsService
        .updateOfferContract(id, this.offerContract)
        .subscribe((response) => {
          console.log(response);
        });
    });
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message: 'You turned down the job offer',
      },
    });
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.contractsService
      .getOfferContractsClient(this.user_id)
      .subscribe((response) => {
        this.offerContracts = response;
        console.log(this.offerContracts);
      });
    this.contractsService
      .getPendingContractsClient(this.user_id)
      .subscribe((response) => {
        this.pendingContracts = response;
      });
    this.contractsService
      .getHistoryContractsClient(this.user_id)
      .subscribe((response) => {
        this.historyContracts = response;
      });
  }
}
