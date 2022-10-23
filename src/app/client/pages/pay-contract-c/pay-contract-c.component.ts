import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pay-contract-c',
  templateUrl: './pay-contract-c.component.html',
  styleUrls: ['./pay-contract-c.component.css']
})
export class PayContractCComponent implements OnInit {
  pendingcontract: any = [];
  contract_id:any;
  basePath = 'http://localhost:3000/api/v1/';

  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  form: FormGroup = this.formBuilder.group({
    creditCard: [],
    creditCardDate: [],
    creditCardCvv: [],
  });

  get creditCard() {
    return this.form.get('creditCard');
  }

  get creditCardDate() {
    return this.form.get('creditCardDate');
  }

  get creditCardCvv() {
    return this.form.get('creditCardCvv');
  }
  

  ngOnInit(): void {
    this.contract_id=localStorage.getItem('ContractId')

    this.getContract(this.contract_id).subscribe((data: any) => {
      this.pendingcontract = data[0];
    });
  }

  getContract(id: any) {
    return this.http.get(`${this.basePath}pendingContracts?id=${id}`);
  }

}
