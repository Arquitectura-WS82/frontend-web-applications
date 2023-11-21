import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { CommentService } from '@app/services/CommentService';

export interface CommentData {
  comment: string;
  stars: number;
}

@Component({
  selector: 'add-comment-dialog',
  templateUrl: 'add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent {
  commentForm: FormGroup;
  basePath: string = GlobalVariable.BASE_API_URL + '/comments';
  commentData: CommentData;

  constructor(
    private commentService: CommentService,
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contractId: number,
      clientId: number
    },
    public formBuilder: FormBuilder,
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', {
        validators: [Validators.required, Validators.maxLength(200)],
        updateOn: 'change'
      }],
      rating: ['', { validators: [Validators.required], updateOn: 'change' }]
    });
    this.commentData = {} as CommentData;
  }
  get comment() {
    return this.commentForm.get('comment');
  }
  get rate() {
    return this.commentForm.get('rating');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveComment() {
    this.commentData.comment = this.commentForm.value.comment;
    this.commentData.stars = this.commentForm.value.rating;

    this.commentService.postComment(this.commentData, 
      this.data.clientId, this.data.contractId)
    .subscribe(res => {
      console.log(res);
      this.dialogRef.close();
    });

  }
}