import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractDialogComponent } from '../../components/contract-dialog/contract-dialog.component';

@Component({
  selector: 'app-contracts-d',
  templateUrl: './contracts-d.component.html',
  styleUrls: ['./contracts-d.component.css'],
})
export class ContractsDComponent implements OnInit {
  public offerContracts: any = [];
  public pendingContracts: any = [];
  public historyContracts: any = [];
  user_id:any;

  constructor(
    private contractsService: ContractsService,
    public dialog: MatDialog
  ) {}

  acceptContract(): void {
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message:
          'The contract has been signed. When you finish the work, we will pay you',
      },
    });
  }
  declineContract(): void {
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message: 'You turned down the job offer',
      },
    });
  }

  ngOnInit(): void {
    this.user_id=localStorage.getItem('currentUser')
    this.contractsService.getOffers(this.user_id).subscribe((response) => {
      this.offerContracts = response;
    });
    this.contractsService.getPending(this.user_id).subscribe((response) => {
      this.pendingContracts = response;
    });
    this.contractsService.getHistory(this.user_id).subscribe((response) => {
      this.historyContracts = response;
    });
  }
}
