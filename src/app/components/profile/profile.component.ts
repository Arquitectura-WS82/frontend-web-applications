import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddCommentDialogComponent, CommentData } from '../add-comment-dialog/add-comment-dialog.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  jobs: any;
  user: any;
  comments: any;
  id: any;
  vehicle: any;
  pageSlice: any;
  commentData: CommentData;

  constructor(
    private http: HttpClient,
    private router: Router,
    route: ActivatedRoute, 
    public dialog: MatDialog
  ) {
    route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.commentData = {} as CommentData;
  }

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '20%',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.commentData = result;
      console.log(result);
    });
  }
  ngOnInit(): void {
    //localStorage.setItem('currentUser', '5');
    // if (localStorage.getItem("visitDriverId") != '-1')
    //   this.user_id = localStorage.getItem('visitDriverId')
    // else
    //   this.user_id = localStorage.getItem('currentUser')

    // localStorage.setItem('visitDriverId',"-1")
    this.getUser(this.id).subscribe((data: any) => {
      this.user = data;
    });
    this.getExperience(this.id).subscribe((data: any) => {
      this.jobs = data;
      console.log(this.jobs);
    });
    this.getComments(this.id).subscribe((data: any) => {
      this.comments = data;
      this.pageSlice = this.comments.slice(0, 3);
    });
    this.getVehicle(this.id).subscribe((data: any) => {
      this.vehicle = data;
    });
    this.onPageChange;

  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.comments.length) {
      endIndex = this.comments.length;
    }
    this.pageSlice = this.comments.slice(startIndex, endIndex);
  }

  getUser(id: any) {
    return this.http.get(`${this.basePath}/drivers/${id}`);
  }
  getVehicle(id: any) {
    return this.http.get(`${this.basePath}/vehicle/${id}`);
  }
  getExperience(id: any) {
    return this.http.get(`${this.basePath}/experience/${id}`);
  }
  getComments(id: any) {
    return this.http.get(`${this.basePath}/comments/driver/${id}`);
  }

  goRequestService() {
    this.router.navigate([`/request-service/${this.id}`]);
  }
  openCommentModal() {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '250px',
      data: this.commentData,

    });
    console.log(this.commentData)
    dialogRef.afterClosed().subscribe(result => {
      this.commentData.comment = result.comment;
      this.commentData.star = result.rating;
      this.saveComment().subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      })
    });

  }
  saveComment() {

    return this.http.post(
      `${this.basePath}/comments/add/${localStorage.getItem("currentUser")}/${this.id}`, 
      this.commentData, 
      this.httpOptions);
  }
}
