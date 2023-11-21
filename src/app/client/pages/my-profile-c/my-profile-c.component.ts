import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '@services/ClientService';
import { UpdateInfoComponent } from '@app/components/update-info/update-info.component';
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
    const dialogRef = this.dialog.open(UpdateInfoComponent, {
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

  openEditModal() {
    this.dialog.open(UpdateInfoComponent, {
      width: '250px',
    });
  }

  getUser(id: any) {
    return this.clientService.getClientById(id);
  }
}
