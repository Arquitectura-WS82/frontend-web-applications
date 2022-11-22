import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractDialogComponent } from '../../../components/contract-dialog/contract-dialog.component';
import { PendingContract } from 'src/app/models/contracts/pending';

@Component({
  selector: 'app-contracts-c',
  templateUrl: './contracts-c.component.html',
  styleUrls: ['./contracts-c.component.css'],
})
export class ContractsCComponent implements OnInit {
  public pendingContracts: any = [];
  public historyContracts: any = [];
  user_id: any;
  pendingContract: PendingContract;

  constructor(
    private contractsService: ContractsService,
    public dialog: MatDialog
  ) {
    this.pendingContract = {} as PendingContract;
  }

  declineContract(id: number): void {
    // this.contractsService.getPendingContractById(id).subscribe((response) => {
    //   this.pendingContract = response;
    //   console.log(this.pendingContract);
    //   this.pendingContract.status = 'rejected';
    //   this.contractsService
    //     .updatePendingContract(id, this.pendingContract)
    //     .subscribe((response) => {
    //       console.log(response);
    //     });
    // });
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
  }

  finishContract(id: number){
    this.contractsService.changeContractStatus(id, 3).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    });
    ///contracts/1/update-status/2
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.contractsService
      .getPendingContracts(this.user_id)
      .subscribe((response) => {
        this.pendingContracts = response;
        //console.log(this.pendingContracts);
      });
    this.contractsService
      .getHistoryContracts(this.user_id)
      .subscribe((response) => {
        this.historyContracts = response;
        //console.log(this.historyContracts);
      });
  }
}
