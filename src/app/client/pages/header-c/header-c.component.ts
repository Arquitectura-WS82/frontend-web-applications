import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css']
})
export class HeaderCComponent implements OnInit {
  hidden = false;
  i=0;
  public accepted=true;
  clientnotifications:any;
  unreadnoti:any;
  pendingcontrats:any;
  user_id:any;
  
  constructor(private http: HttpClient, private router: Router) { }
  
  basePath = 'http://localhost:3000/api/v1/';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }
  ngOnInit(): void {
    this.user_id=localStorage.getItem('currentUser')
    this.getClientNotifications(this.user_id).subscribe((data: any) => {
      this.clientnotifications = data;
      this.i=this.clientnotifications.length;
      console.log(this.i)

    });
    this.getUnreadNotifications(this.user_id).subscribe((data: any) => {
      this.i=data.length;
      console.log(this.unreadnoti)

    });
    this.getPendingContracts(this.user_id).subscribe((data: any) => {
      this.pendingcontrats = data;
    });

    
  }

  showAccept(){
    this.accepted=true;
  }
  toggleBadgeVisibility() {
    this.hidden = true;
  }
  
  getUser(id: any) {
    return this.http.get(`${this.basePath}users?id=${id}`);
  }

  getClientNotifications(id: any) {
    return this.http.get(`${this.basePath}clientNotifications?clientId=${id}`);
  }
  getUnreadNotifications(id: any) {
    return this.http.get(`${this.basePath}clientNotifications?clientId=${id}&status=unread`);
  }

  updateNoti(){
    this.unreadnoti.status=this.unreadnoti.status.setValue('read');
  }

  getPendingContracts(id: any){
    return this.http.get(`${this.basePath}pendingContracts?id=${id}`);
  }
  goToContract(id: any) {
    this.router.navigate([`app-pay-contract-c/`])
    localStorage.setItem('ContractId', id)
  }

}
