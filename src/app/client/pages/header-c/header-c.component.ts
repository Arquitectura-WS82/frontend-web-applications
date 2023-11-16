import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '@app/shared/GlobalVariable';
import { ContractService } from '@services/ContractService';
import { Contract } from '@models/contract';

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css'],
})
export class HeaderCComponent implements OnInit {
  hidden = false;
  cont = 0;
  accepted = true;
  clientNotifications: Contract[];
  defaultImage: string = 'assets/images/default-user.png';

  constructor(
    private contractService: ContractService,
    private router: Router
  ) {
    this.clientNotifications = [] as Contract[];
  }

  url: string = GlobalVariable.BASE_API_URL;

  ngOnInit(): void {
    let user_id = localStorage.getItem('currentUser') || '';

    this.getClientNotifications(parseInt(user_id));

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

  getClientNotifications(id: number) {
    this.contractService.getContracts().subscribe((data: any) => {
      this.clientNotifications = data.filter((contract: Contract) => {
        if (contract.client.id == id) {
          return contract;
        }
        return null;
      }) as Contract[];
    });
  }

  getUnreadNotifications(id: number) {
    this.contractService
      .getUnreadNotifications(id, 'client')
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].notification.readStatus == false &&
            (data[i].status.status == 'PENDING' ||
              (data[i].status.status == 'OFFER' && data[i].visible == false))
          ) {
            this.cont++;
          }
        }
      });
  }

  updateNot(clientId: number) {
    this.contractService
      .getUnreadNotifications(clientId, 'client')
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].status.status != 'OFFER')
            this.contractService.changeNotificationStatus(data[i].id);
        }
        console.log(
          '🚀 ~ file: header-c.component.ts:80 ~ HeaderCComponent ~ .subscribe ~ data:',
          data
        );
      });
  }

  goToContract(id: any) {
    this.router.navigate([`app-pay-contract-c/`]);
    localStorage.setItem('ContractId', id);
  }
}
