import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RequestForm } from 'src/app/models/request-form/request-form';
import { ClientSService } from 'src/app/client/services/client-s.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContractDialogComponent } from 'src/app/components/contract-dialog/contract-dialog.component';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css'],
})
export class RequestServiceComponent implements OnInit {
  request: RequestForm;

  requestServiceForm: FormGroup;
  typeofService: string;

  constructor(
    public formBuilder: FormBuilder,
    private clientService: ClientSService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.typeofService = '';

    this.request = {} as RequestForm;

    this.requestServiceForm = this.formBuilder.group({
      regionFrom: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      regionTo: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      date: ['', { validators: [Validators.required], updatedOn: 'change' }],
      type: ['', { validators: [Validators.required], updatedOn: 'change' }],
      quantity: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      timeStart: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      timeFinish: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      amount: ['', { validators: [Validators.required], updatedOn: 'change' }],
      description: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      subject: ['', { validators: [Validators.required], updatedOn: 'change' }],
    });
  }

  ngOnInit(): void {
    this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message: 'The driver has been notified',
      },
    });
  }

  get regionFrom() {
    return this.requestServiceForm.get('regionFrom');
  }
  get regionTo() {
    return this.requestServiceForm.get('regionTo');
  }
  get date() {
    return this.requestServiceForm.get('date');
  }
  get type() {
    return this.requestServiceForm.get('type');
  }
  get quantity() {
    return this.requestServiceForm.get('quantity');
  }
  get timeStart() {
    return this.requestServiceForm.get('timeStart');
  }
  get timeFinish() {
    return this.requestServiceForm.get('timeFinish');
  }
  get amount() {
    return this.requestServiceForm.get('amount');
  }
  get description() {
    return this.requestServiceForm.get('description');
  }
  get subject() {
    return this.requestServiceForm.get('subject');
  }

  registerOffer() {
    this.formToRequest();

    this.clientService.addOffer(this.request).subscribe((res) => {
      console.log(res);
      //alert("Registro exitoso");
      this.dialog.open(ContractDialogComponent, {
        width: '30vw',
        data: {
          message: 'The driver has been notified',
        },
      });
      //this.router.navigate(['/search']);
    });

    //this.router.navigate(['/home-c']);
  }

  formToRequest() {
    let clientId = localStorage.getItem('currentUser');
    this.request.driverId = 5;
    this.request.clientId = clientId;
    this.request.from = this.requestServiceForm.value.regionFrom;
    this.request.to = this.requestServiceForm.value.regionTo;
    this.request.date = this.requestServiceForm.value.date;
    this.request.type = this.requestServiceForm.value.type;
    this.request.quantity = this.requestServiceForm.value.quantity;
    this.request.timeDeparture = this.requestServiceForm.value.timeStart;
    this.request.timeArrival = this.requestServiceForm.value.timeFinish;
    this.request.amount = this.requestServiceForm.value.amount;
    this.request.subject = this.requestServiceForm.value.subject;
    this.request.description = this.requestServiceForm.value.description;
  }

  onSubmit() {
    console.log(this.requestServiceForm.valid);
  }
}
