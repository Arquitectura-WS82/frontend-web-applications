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
  public contracts: any = [];

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
    this.contractsService.uploadContracts().subscribe((response) => {
      console.log(response);
      this.contracts = response;
    });
  }
}
