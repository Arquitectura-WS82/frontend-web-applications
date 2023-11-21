import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { ContractDialogComponent } from '../../../components/contract-dialog/contract-dialog.component';
import { ContractService } from '@app/services/ContractService';
import { CarrierService } from '@app/services/CarrierService';
import { Contract } from '@app/models/contract';
import { User } from '@app/models/user';

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

  contract: Contract;
  carrier: User;

  constructor(
    private contractService: ContractService,
    private carrierService: CarrierService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.contract = {} as Contract;
    this.carrier = {} as User;
  }

  ngOnInit(): void {
    localStorage.setItem('contractId', '2');
    this.contractId = localStorage.getItem('contractId');

    this.contractService.getContracts().subscribe((res) => {
      let c = res.find((x: Contract) => x.id == this.contractId);
      if (c) {
        this.contract = c;
        this.carrierService
          .getCarrierById(this.contract.carrier.id)
          .subscribe((res) => {
            this.carrier = res;
          });
      }
    });
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
