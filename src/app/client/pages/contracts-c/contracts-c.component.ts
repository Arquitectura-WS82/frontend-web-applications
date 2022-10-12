import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractDialogComponent } from '../../../components/contract-dialog/contract-dialog.component';

@Component({
  selector: 'app-contracts-c',
  templateUrl: './contracts-c.component.html',
  styleUrls: ['./contracts-c.component.css'],
})
export class ContractsCComponent implements OnInit {
  public offerContracts: any = [];
  public pendingContracts: any = [];
  public historyContracts: any = [];
  user_id: any;

  constructor(
    private contractsService: ContractsService,
    public dialog: MatDialog
  ) {}

  declineContract(): void {
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message: 'You turned down the job offer',
      },
    });
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.contractsService.getPending().subscribe((response) => {
      this.pendingContracts = response;
    });
    this.contractsService.getHistory().subscribe((response) => {
      this.historyContracts = response;
    });
  }
}
