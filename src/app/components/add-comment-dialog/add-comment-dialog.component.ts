import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

export interface CommentData {
  comment: string;
  star: number;

}

@Component({
  selector: 'add-comment-dialog',
  templateUrl: 'add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent {
  commentForm: FormGroup;
  basePath: string = GlobalVariable.BASE_API_URL + '/comments';

  constructor(
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentData,
    public formBuilder: FormBuilder,
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', {
        validators: [Validators.required, Validators.maxLength(200)],
        updateOn: 'change'
      }],
      rating: ['', { validators: [Validators.required], updateOn: 'change' }]
    });
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
  // saveComment() {
  //   this.data.comment.comment = this.commentForm.value.comment;
  //   this.data.comment.rating = this.commentForm.value.rating;
  // }
  // onSubmit() {
  //   this.saveComment();
  // }

}