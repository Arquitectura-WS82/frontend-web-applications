import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent, CommentData } from '@app/components/add-comment-dialog/add-comment-dialog.component';
import { CommentService } from '@app/services/CommentService';
import { Contract } from '@models/contract';
import { ContractService } from '@services/ContractService';

export interface HistoryContract {
  historyContract: Contract;
  comment: boolean;
}

@Component({
  selector: 'app-contracts-c',
  templateUrl: './contracts-c.component.html',
  styleUrls: ['./contracts-c.component.css'],
})
export class ContractsCComponent implements OnInit {
  pendingContracts: Contract[];
  pendingContract: Contract;
  user_id: any;
  defaultImage = '../../../../assets/img/user-vector.png';
  commentData: CommentData;

  historyContracts: HistoryContract[];

  constructor(
    private contractService: ContractService,
    private commentService: CommentService,
    public dialog: MatDialog
  ) {
    this.pendingContract = {} as Contract;
    this.pendingContracts = [] as Contract[];
    this.commentData = {} as CommentData;
    this.historyContracts = [] as HistoryContract[];
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

    let history: Contract[];
    this.contractService
      .getHistoryContracts(this.user_id, 'client')
      .subscribe((res) => {
        history = res;
        history.forEach((contract) => {
          this.commentService.getCommentsByContractId(contract.id).subscribe((res) => {
            // no comment == nulo
            if (res != null) {
              this.historyContracts.push({
                historyContract: contract,
                comment: true,
              });
            } else {
              this.historyContracts.push({
                historyContract: contract,
                comment: false,
              });
            }
          });
        })
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //recargar la pagina para que se vea el comentario
      this.ngOnInit();
    });
  }

  openCommentModal(id: number) {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '250px',
      data: {
        contractId: id,
        clientId: this.user_id,
      }
    });
    console.log(this.commentData);

  }

}
