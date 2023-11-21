import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { District, User } from '@models/user';
import { ClientService } from '@services/ClientService';
import { CarrierService } from '@app/services/CarrierService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-info-one',
  templateUrl: './add-info-one.component.html',
  styleUrls: ['./add-info-one.component.css'],
})
export class AddInfoOneComponent {
  user: User;
  updateForm: FormGroup = {} as FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private clientService: ClientService,
    private carrierService: CarrierService,
    public dialogRef: MatDialogRef<AddInfoOneComponent>,
  ) {
    this.user = {} as User;
    this.updateForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [ Validators.email],
          updateOn: 'change',
        },
      ],
      password: [
        '',
        {
          validators: [ Validators.minLength(7)],
          updateOn: 'change',
        },
      ],
      first_name: [
        '',
        { validators: [], updateOn: 'change' },
      ],
      last_name: [
        '',
        { validators: [], updateOn: 'change' },
      ],

      phone: ['', { updateOn: 'change' }],

      description: ['', { updateOn: 'change' }],
    });
  }

  ngOnInit(): void {
    let userId = parseInt(localStorage.getItem('currentUser') || '');
    let type = localStorage.getItem('typeofuser');
    if (userId && type) {
      if (type == 'client') {
        this.clientService.getClientById(userId).subscribe((data) => {
          this.user = data;
        });
      } else {
        this.carrierService.getCarrierById(userId).subscribe((data) => {
          this.user = data;
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(): void {
    let userId = parseInt(localStorage.getItem('currentUser') || '');
    let type = localStorage.getItem('typeofuser');
    console.log(this.user);
    if (userId && type) {
      if (type == 'client') {
        this.clientService
          .updateClient(this.user, this.user.district.id)
          .subscribe();
      } else {
        this.carrierService
          .updateCarrier(this.user, this.user.district.id)
          .subscribe();
      }
    }
    this.dialogRef.close();
  }
}
