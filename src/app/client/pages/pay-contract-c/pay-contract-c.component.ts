import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { ContractService } from '@app/services/ContractService';
import { Contract } from '@app/models/contract';

@Component({
  selector: 'app-pay-contract-c',
  templateUrl: './pay-contract-c.component.html',
  styleUrls: ['./pay-contract-c.component.css']
})
export class PayContractCComponent implements OnInit {
  acceptedContract: Contract;
  contract_id: any;
  defaultImage: string = "../../../../assets/img/user-vector.png";

  constructor(
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.acceptedContract = {} as Contract;
    this.contract_id = localStorage.getItem('ContractId')

    // setTimeout(() => {
    // }, 1000);
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
    this.getContract(this.contract_id);

    // this.getContract(this.contract_id).subscribe((data: any) => {
    //   this.acceptedcontract = data;
    // });
  }

  getContract(id: any) {
    this.contractService.getContracts().subscribe((data: any) => {
      data.filter((contract: any) => {
        if (contract.id == id) {
          this.acceptedContract = contract;   
        }
      });
    });
  }

  goHome() {
    this.router.navigate(['/home-c']);
  }
}
