import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxCcModule } from 'ngx-cc/lib/ngx-cc.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { sha256 } from 'js-sha256';
import { ContractDialogComponent } from '../../../components/contract-dialog/contract-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-contract',
  templateUrl: './end-contract.component.html',
  styleUrls: ['./end-contract.component.css'],
})
export class EndContractComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    creditCard: [],
    creditCardDate: [],
    creditCardCvv: [],
  });

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  acceptContract(): void {
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      width: '30vw',
      data: {
        message: 'Succesfull Payment',
      },
    });
  }

  get creditCard() {
    return this.form.get('creditCard');
  }

  get creditCardDate() {
    return this.form.get('creditCardDate');
  }

  get creditCardCvv() {
    return this.form.get('creditCardCvv');
  }

  contractId: any;
  driverId: any;

  contract: any;
  driverInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('contractId', '2');
    this.contractId = localStorage.getItem('contractId');
    this.getOfferContract(this.contractId).subscribe((data) => {
      this.contract = data[0];
      this.driverId = this.contract.driver.id;
      this.getDriverById(this.driverId).subscribe((dataD) => {
        this.driverInfo = dataD;
        console.log(this.driverId);
        console.log(dataD);
      });
    });
  }

  getOfferContract(id: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/contracts/offer/driver/${id}`);
  }

  getDriverById(id: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/drivers/${id}`);
  }

  submitPay() {
    var hash = sha256(
      this.creditCard?.value +
        this.creditCardDate?.value +
        this.creditCardCvv?.value
    );
    console.log(hash);
    this.acceptContract();
    this.router.navigate(['/home-d']);
  }
}
