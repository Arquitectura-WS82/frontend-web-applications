import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxCcModule } from 'ngx-cc/lib/ngx-cc.module';



@Component({
  selector: 'app-end-contract',
  templateUrl: './end-contract.component.html',
  styleUrls: ['./end-contract.component.css']
})
export class EndContractComponent implements OnInit {

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

  contract = {
    subject:'Tourism in Barranca',
    from: 'La Victoria, Lima',
    to: 'Barranca',
    date: '2020-12-12',
    time: '12:00',
    type: 'Cargo Truck',
    id: '87832498',
    amount: '1000.00',
    client: {
      name: 'Raul Alvarez',
      phone: '987654321',
      photoUrl: "https://c8.alamy.com/compes/2j8d9nm/pensativo-hermosa-joven-empresaria-adulta-gerente-en-un-traje-con-un-tablet-pc-en-la-oficina-empresario-2j8d9nm.jpg",

    }
  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }

}
