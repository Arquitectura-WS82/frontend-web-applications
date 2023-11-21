import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractDialogComponent } from '@components/contract-dialog/contract-dialog.component';
import { Contract } from '@models/contract';
import { District } from '@models/user';
import { CarrierService } from '@services/CarrierService';
import { ClientService } from '@services/ClientService';
import { ContractService } from '@services/ContractService';
import { DistrictService } from '@services/DistrictService';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css'],
})
export class RequestServiceComponent implements OnInit {
  contract: Contract;

  requestServiceForm: FormGroup;
  carrierId: number = 0;

  districts: District[];
  filteredDistrictsFrom: Observable<District[]> | undefined;
  filteredDistrictsTo: Observable<District[]> | undefined;

  currentYear = new Date().getFullYear();
  // Que deje elegir desde la fecha de hoy 
  minDate = new Date(this.currentYear, new Date().getMonth(), new Date().getDate());

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private contractService: ContractService,
    private clientService: ClientService,
    private carrierService: CarrierService,
    private districtService: DistrictService,
    private datePipe: DatePipe,
    route: ActivatedRoute
  ) {
    route.params.subscribe((params) => {
      this.carrierId = params['id'];
    });

    this.districts = [] as District[];
    this.contract = {} as Contract;

    this.requestServiceForm = this.formBuilder.group({
      typeofService: ['', { validators: [Validators.required] }],
      amount: ['', { validators: [Validators.required], updatedOn: 'change' }],
      description: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      streetFrom: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      streetTo: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      districtFrom: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      districtTo: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      quantity: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      subject: ['', { validators: [Validators.required], updatedOn: 'change' }],
      date: ['', { validators: [Validators.required], updatedOn: 'change' }],
      timeArrival: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      timeDeparture: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
    });
  }

  displayFn(district?: District): string {
    return district ? district.name : '';
  }

  _filter(value: string): District[] {
    const filterValue = value.toLowerCase();

    return this.districts.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.clientService
      .getClientById(parseInt(localStorage.getItem('currentUser') || ''))
      .subscribe((res) => {
        this.contract.client = res;
      });

    this.carrierService.getCarrierById(this.carrierId).subscribe((res) => {
      this.contract.carrier = res;
    });

    this.districtService.getDistricts().subscribe((res) => {
      this.districts = res;
    });

    this.filteredDistrictsFrom = this.requestServiceForm
      ?.get('districtFrom')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );

    this.filteredDistrictsTo = this.requestServiceForm
      ?.get('districtTo')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
  }

  registerOffer() {
    this.formToRequest();

    let clientId = localStorage.getItem('currentUser') || '';

    console.log(this.contract);

    this.contractService
      .addContract(
        this.contract,
        parseInt(clientId),
        this.carrierId,
        this.requestServiceForm.value.districtFrom.id,
        this.requestServiceForm.value.districtTo.id
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
    this.contract.date = this.datePipe.transform(
      new Date(this.requestServiceForm.value.date),
      'yyyy-MM-dd'
    ) as string;
    this.contract.quantity = this.requestServiceForm.value.quantity;
    this.contract.timeDeparture =
      this.requestServiceForm.value.timeArrival + ':00';
    this.contract.timeArrival =
      this.requestServiceForm.value.timeDeparture + ':00';
    this.contract.amount = this.requestServiceForm.value.amount;
    this.contract.subject = this.requestServiceForm.value.subject;
    this.contract.description = this.requestServiceForm.value.description;
  }
}
