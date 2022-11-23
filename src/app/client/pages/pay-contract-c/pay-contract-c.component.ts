import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-pay-contract-c',
  templateUrl: './pay-contract-c.component.html',
  styleUrls: ['./pay-contract-c.component.css']
})
export class PayContractCComponent implements OnInit {
  acceptedcontract: any = [];
  contract_id:any;
  //basePath = 'http://localhost:3000/api/v1/';
  url: string = GlobalVariable.BASE_API_URL;

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
      this.acceptedcontract = data;
    });
  }

  getContract(id: any) {
    return this.http.get(`${this.url}/contracts/${id}`);
  }
  
  goHome(){
    this.router.navigate(['/home-c']);
  }

}
