import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { CarrierService } from '@services/CarrierService';
import { GlobalVariable } from '@app/shared/GlobalVariable';
import { ContractService } from '@services/ContractService';
import { ClientService } from '@services/ClientService';
import { Contract } from '@models/contract';

@Component({
  selector: 'app-home-c',
  templateUrl: './home-c.component.html',
  styleUrls: ['./home-c.component.css'],
})
export class HomeCComponent implements OnInit {
  client: User;
  best_ranked: User[];
  defaultImage: string = '../../../../assets/img/user-vector.png';

  historyContracts: Contract[];
  driver_route: any;

  constructor(
    private clientService: ClientService,
    private carrierService: CarrierService,
    private contractService: ContractService,
    private router: Router
  ) {
    this.best_ranked = [] as User[];
    this.client = {} as User;
    this.historyContracts = [] as Contract[];
  }

  ngOnInit(): void {
    let user_id = localStorage.getItem('currentUser') || '';

    this.clientService.getClientById(user_id).subscribe((res: any) => {
      this.client = res;
    });

    this.carrierService.getCarriers().subscribe((res: any) => {
      this.best_ranked = res;
    });

    this.contractService
      .getHistoryContracts(parseInt(user_id), 'client')
      .subscribe((res: any) => {
        this.historyContracts = res;
      });
  }

  counter(i: number) {
    return new Array(i);
  }

  goToDriver(id: any) {
    this.router.navigate([`profile/${id}`]);
    localStorage.setItem('visitDriverId', id);
  }
}
