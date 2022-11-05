import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-header-d',
  templateUrl: './header-d.component.html',
  styleUrls: ['./header-d.component.css'],
})
export class HeaderDComponent implements OnInit {
  hidden = false;
  i = 0;
  public accepted = true;
  drivernotifications: any;
  unreadnoti: any;
  pendingcontrats: any;
  user_id: any;
  constructor(private http: HttpClient, private router: Router) {}

  //basePath = 'http://localhost:3000/api/v1/';
  basePath: string = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');
    this.getDriverNotifications(this.user_id).subscribe((data: any) => {
      this.drivernotifications = data;
      this.i = this.drivernotifications.length;
      console.log(this.i);
    });
    this.getUnreadNotifications(this.user_id).subscribe((data: any) => {
      this.i = data.length;
      console.log(this.unreadnoti);
    });
    //this.getPendingContracts(this.user_id).subscribe((data: any) => {
    //  this.pendingcontrats = data;
    //});
  }
  showAccept() {
    this.accepted = true;
  }
  toggleBadgeVisibility() {
    this.hidden = true;
  }

  getUserById(driverId: any) {
    return this.http.get(`${this.basePath}drivers/${driverId}`);
  }

  getDriverNotifications(id: any) {
    return this.http.get(
      `${this.basePath}contracts/notifications-driver/${id}`
    );
  }
  getUnreadNotifications(id: any) {
    return this.http.get(
      `${this.basePath}contracts/unread-notifications/driver/{id}`
    );
  }

  updateNoti() {
    this.unreadnoti.status = this.unreadnoti.status.setValue('read');
  }
  updateNotification(driverId: number) {
    return this.http.put(
      `${this.basePath}contracts/notification-read/driver/${driverId}`,
      null
    );
  }

  //getPendingContracts(id: any) {
  //  return this.http.get(`${this.basePath}pending-contracts?id=${id}`);
  //}
  goToContract() {
    this.router.navigate([`end-contract/`]);
    //localStorage.setItem('ContractId', id)
  }
}
