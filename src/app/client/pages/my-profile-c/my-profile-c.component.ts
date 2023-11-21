import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '@services/ClientService';
import {
  AddInfoOneComponent,
} from '@components/add-info-one/add-info-one.component';
import { GlobalVariable } from '@app/shared/GlobalVariable';
import { User } from '@models/user';

@Component({
  selector: 'app-my-profile-c',
  templateUrl: './my-profile-c.component.html',
  styleUrls: ['./my-profile-c.component.css'],
})
export class MyProfileCComponent implements OnInit {
  user: User;
  user_id: any;


  constructor(private clientService: ClientService, public dialog: MatDialog) {

    this.user = {} as User;
  }

  basePath = GlobalVariable.BASE_API_URL;

  openDialog(): void {
    const dialogRef = this.dialog.open(AddInfoOneComponent, {
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.getUser(this.user_id).subscribe((data: any) => {
      this.user = data;
    });
  }

  openDescriptionModal() {
    const dialogRef = this.dialog.open(AddInfoOneComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe();
  }


  getUser(id: any) {
    return this.clientService.getClientById(id);
  }
}
