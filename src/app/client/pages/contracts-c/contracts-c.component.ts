import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contract } from '@models/contract';
import { ContractService } from '@services/ContractService';

@Component({
  selector: 'app-contracts-c',
  templateUrl: './contracts-c.component.html',
  styleUrls: ['./contracts-c.component.css'],
})
export class ContractsCComponent implements OnInit {
  pendingContracts: Contract[];
  historyContracts: Contract[];
  pendingContract: Contract;
  user_id: any;
  defaultImage = '../../../../assets/img/user-vector.png';

  constructor(
    private contractService: ContractService,
    public dialog: MatDialog
  ) {
    this.pendingContract = {} as Contract;
    this.pendingContracts = [] as Contract[];
    this.historyContracts = [] as Contract[];
  }

  finishContract(pendingContract: Contract) {
    this.contractService
      .changeContractStatus(pendingContract, 'HISTORY')
      .subscribe((res) => {
        console.log(res);
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.contractService
      .getPendingContracts(this.user_id, 'client')
      .subscribe((res) => {
        this.pendingContracts = res;
      });
    this.contractService
      .getHistoryContracts(this.user_id, 'client')
      .subscribe((res) => {
        this.historyContracts = res;
      });
  }
}
