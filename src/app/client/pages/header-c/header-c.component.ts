import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css'],
})
export class HeaderCComponent implements OnInit {
  hidden = false;
  cont = 0;
  public accepted = true;
  clientnotifications: any;
  unreadnoti: any;
  pendingcontrats: any;
  user_id: any;

  constructor(private http: HttpClient, private router: Router) {}

  //basePath = 'http://localhost:3000/api/v1/';
  url: string = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };
  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');
    this.getClientNotifications(this.user_id).subscribe((data: any) => {
      this.clientnotifications = data;
      //this.i = this.clientnotifications.length;
      
      // console.log(this.i);
    });
    this.getUnreadNotifications(this.user_id).subscribe((data: any) => {
       console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log("adios")
        if (data[i].notification.readStatus == false &&
          (data[i].status.status == "PENDING" || 
          (data[i].status.status == "OFFER" && data[i].visible == false))) {
            console.log("hola")
            this.cont++;
        }
      }

      // console.log(this.unreadnoti);
      
    });
    // this.getPendingContracts(this.user_id).subscribe((data: any) => {
    //   this.pendingcontrats = data;
    // });
  }

  showAccept() {
    this.accepted = true;
  }
  toggleBadgeVisibility() {
    this.hidden = true;
  }
  updateNotification(userId: any){
    this.updateNot(userId).subscribe((data: any) => {
      console.log(data);
    });
  }
  // Cambio
  getUserById(userId: any) {
    return this.http.get(`${this.url}/clients/${userId}`);
  }
  getClientNotifications(id: any) {
    return this.http.get(`${this.url}/contracts/notifications-client/${id}`);
  }
  getUnreadNotifications(id: any) {
    return this.http.get(
      `${this.url}/contracts/unread-notifications/client/${id}`
    );
  }
  updateNot(clientId: number) {
    return this.http.put(
      `${this.url}/contracts/notification-read/client/${clientId}`,
      null
    );
  }
  // getPendingContracts(id: any) {
  //   return this.http.get(`${this.url}pendingContracts?id=${id}`);
  // }

  goToContract(id: any) {
    this.router.navigate([`app-pay-contract-c/`]);
    localStorage.setItem('ContractId', id);
  }
}
