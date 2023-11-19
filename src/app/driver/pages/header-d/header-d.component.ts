import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '@models/contract';
import { GlobalVariable } from '@app/shared/GlobalVariable';
import { ContractService } from '@services/ContractService';

@Component({
  selector: 'app-header-d',
  templateUrl: './header-d.component.html',
  styleUrls: ['./header-d.component.css'],
})
export class HeaderDComponent implements OnInit {
  hidden = false;
  cont = 0;
  public accepted = true;
  carrierNotifications: Contract[];
  unreadNotifications: Contract[];
  pendingContracts: Contract[];

  constructor(
    private contractService: ContractService,
    private router: Router
  ) {
    this.carrierNotifications = [] as Contract[];
    this.unreadNotifications = [] as Contract[];
    this.pendingContracts = [] as Contract[];
  }

  ngOnInit(): void {
    let user_id = localStorage.getItem('currentUser') || '';

    this.getDriverNotifications(parseInt(user_id));

    this.getUnreadNotifications(parseInt(user_id));
  }

  showAccept() {
    this.accepted = true;
  }

  toggleBadgeVisibility() {
    this.hidden = true;
  }

  updateNotification() {
    let user_id = localStorage.getItem('currentUser') || '';

    this.updateNot(parseInt(user_id));
  }

  getDriverNotifications(id: any) {
    this.contractService.getContracts().subscribe((data: any) => {
      this.carrierNotifications = data.filter((contract: Contract) => {
        if (contract.carrier.id == id) {
          return contract;
        }
        return null;
      }) as Contract[];
    });
  }

  getUnreadNotifications(id: number) {
    this.contractService
      .getUnreadNotifications(id, 'carrier')
      .subscribe((data: any) => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            if (
              data[i].notification.readStatus == false &&
              (data[i].status.status == 'HISTORY' || // finish contract
                (data[i].status.status == 'OFFER' && data[i].visible == false)) // decline offer
            ) {
              this.cont++;
            }
          }
        }
      });
  }

  updateNot(carrierId: number) {
    this.contractService
      .getUnreadNotifications(carrierId, 'carrier')
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].status.status != 'PENDING' &&
            data[i].notification.readStatus == false
          )
            this.contractService.changeNotificationStatus(data[i]).subscribe();
        }
      });
  }

  goOfferContracts() {
    this.router.navigate([`contracts-d/`]);
  }

  goToContract() {
    this.router.navigate([`end-contract/`]);
  }
}
