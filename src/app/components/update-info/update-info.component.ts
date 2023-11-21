import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CarrierService } from '@app/services/CarrierService';
import { User } from '@models/user';
import { ClientService } from '@services/ClientService';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css'],
})
export class UpdateInfoComponent implements OnInit {
  user: User;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private clientService: ClientService,
    private carrierService: CarrierService,
    public dialogRef: MatDialogRef<UpdateInfoComponent>
  ) {
    this.user = {} as User;
    this.updateForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'change',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(7)],
          updateOn: 'change',
        },
      ],
      first_name: [
        '',
        { Validators: [Validators.required], updateOn: 'change' },
      ],
      last_name: [
        '',
        { Validators: [Validators.required], updateOn: 'change' },
      ],
      phone: ['', { Validators: [Validators.required], updateOn: 'change' }],
      description: ['', { updateOn: 'change' }],
    });
  }

  ngOnInit(): void {
    let userId = parseInt(localStorage.getItem('currentUser') || '');
    let type = localStorage.getItem('typeofuser');
    if (type == 'client') {
      this.clientService.getClientById(userId).subscribe((data) => {
        this.user = data;
        this.userToForm();
      });
    } else {
      this.carrierService.getCarrierById(userId).subscribe((data) => {
        this.user = data;
        this.userToForm();
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  userToForm() {
    this.updateForm.patchValue({
      email: this.user.email,
      password: this.user.password,
      first_name: this.user.firstName,
      last_name: this.user.lastName,
      phone: this.user.phone,
      description: this.user.description,
    });
  }

  formToUser() {
    let formValue = this.updateForm.value;
    this.user.email = formValue.email;
    this.user.password = formValue.password;
    this.user.firstName = formValue.first_name;
    this.user.lastName = formValue.last_name;
    this.user.phone = formValue.phone;
    this.user.description = formValue.description;
  }

  submit(): void {
    let userId = parseInt(localStorage.getItem('currentUser') || '');
    let type = localStorage.getItem('typeofuser');

    console.log(this.user);
    this.formToUser();

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
