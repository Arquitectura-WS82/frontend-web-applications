import { Component, OnInit } from '@angular/core';
import { Contract } from '@models/contract';
import { User } from '@models/user';
import { CarrierService } from '@services/CarrierService';
import { ContractService } from '@services/ContractService';

@Component({
  selector: 'app-home-d',
  templateUrl: './home-d.component.html',
  styleUrls: ['./home-d.component.css'],
})
export class HomeDComponent implements OnInit {
  carrier: User;
  best_ranked: User[];
  historyContracts: Contract[];
  defaultImage = '../../../../assets/img/user-vector.png';

  constructor(
    private carrierService: CarrierService,
    private contractService: ContractService
  ) {
    this.best_ranked = [] as User[];
    this.carrier = {} as User;
    this.historyContracts = [] as Contract[];
  }

  ngOnInit(): void {
    let user_id = localStorage.getItem('currentUser') || '';

    this.carrierService
      .getCarrierById(parseInt(user_id))
      .subscribe((res: any) => {
        this.carrier = res;
      });

    this.carrierService.getCarriers().subscribe((res: any) => {
      this.best_ranked = res;
    });

    this.contractService
      .getHistoryContracts(parseInt(user_id), 'carrier')
      .subscribe((res: any) => {
        this.historyContracts = res;
      });
  }

  counter(i: number) {
    return new Array(i);
  }
}
