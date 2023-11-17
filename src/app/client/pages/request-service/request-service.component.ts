import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractDialogComponent } from '@components/contract-dialog/contract-dialog.component';
import { Contract } from '@models/contract';
import { ContractService } from '@services/ContractService';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css'],
})
export class RequestServiceComponent implements OnInit {
  contract: Contract;

  requestServiceForm: FormGroup;
  typeofService: string;
  driverId: number = 0;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private contractService: ContractService,
    route: ActivatedRoute
  ) {
    route.params.subscribe((params) => {
      this.driverId = params['id'];
    });

    this.typeofService = '';

    this.contract = {} as Contract;

    this.requestServiceForm = this.formBuilder.group({
      streetFrom: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      type: ['', { validators: [Validators.required], updatedOn: 'change' }],
      streetTo: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      date: ['', { validators: [Validators.required], updatedOn: 'change' }],
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

  ngOnInit(): void {}

  registerOffer() {
    this.formToRequest();

    let clientId = localStorage.getItem('currentUser') || '';

    this.contractService
      .addContract(
        this.contract,
        parseInt(clientId),
        this.driverId,
        this.contract.districtFrom.id,
        this.contract.districtTo.id
      )
      .subscribe((res) => {
        console.log(res);
        this.dialog.open(ContractDialogComponent, {
          width: '30vw',
          data: {
            message: 'The driver has been notified',
          },
        });
        this.router.navigate(['/home-c']);
      });
  }

  formToRequest() {
    this.contract.streetFrom = this.requestServiceForm.value.streetFrom;
    this.contract.streetTo = this.requestServiceForm.value.streetTo;
    this.contract.date = this.requestServiceForm.value.date;
    this.contract.quantity = this.requestServiceForm.value.quantity;
    this.contract.timeDeparture =
      this.requestServiceForm.value.timeStart + ':00';
    this.contract.timeArrival =
      this.requestServiceForm.value.timeFinish + ':00';
    this.contract.amount = this.requestServiceForm.value.amount;
    this.contract.subject = this.requestServiceForm.value.subject;
    this.contract.description = this.requestServiceForm.value.description;
  }

  onSubmit() {
    console.log(this.requestServiceForm.valid);
  }
}
