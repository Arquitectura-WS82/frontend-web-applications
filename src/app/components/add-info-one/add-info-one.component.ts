import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

export interface DescriptionData {
  Description: string;

}

@Component({
  selector: 'app-add-info-one',
  templateUrl: './add-info-one.component.html',
  styleUrls: ['./add-info-one.component.css']
})
export class AddInfoOneComponent {
  DescriptionForm: FormGroup;
  basePath: string = GlobalVariable.BASE_API_URL + '/Descriptions';

  constructor(
    public dialogRef: MatDialogRef<AddInfoOneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DescriptionData,
    public formBuilder: FormBuilder,
  ) {
    this.DescriptionForm = this.formBuilder.group({
      Description: ['', {
        validators: [Validators.required, Validators.maxLength(200)],
        updateOn: 'change'
      }],
    });
  }
  get Description() {
    return this.DescriptionForm.get('Description');
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  // saveDescription() {
  //   this.data.Description.Description = this.DescriptionForm.value.Description;
  //   this.data.Description.rating = this.DescriptionForm.value.rating;
  // }
  // onSubmit() {
  //   this.saveDescription();
  // }

}
