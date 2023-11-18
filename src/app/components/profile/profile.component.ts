import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrierService } from '@services/CarrierService';
import { CommentService } from '@services/CommentService';
import { Comment } from '@models/comment';
import { Experience } from '@models/experience';
import { User } from '@models/user';
import { Vehicle } from '@models/vehicle';
import {
  AddCommentDialogComponent,
  CommentData,
} from '../add-comment-dialog/add-comment-dialog.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  experiences: Experience[];
  comments: Comment[];
  vehicles: Vehicle[];
  carrier: User;
  carrier_id: any;
  commentData: CommentData;
  stars: number[];
  defaultImage = '../../../../assets/img/user-vector.png';

  constructor(
    private carrierService: CarrierService,
    private contractService: CommentService,
    private router: Router,
    route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.experiences = [] as Experience[];
    this.vehicles = [] as Vehicle[];
    this.comments = [] as Comment[];
    this.carrier = {} as User;
    this.commentData = {} as CommentData;
    this.stars = [] as number[];
    route.params.subscribe((params) => {
      this.carrier_id = params['id'];
    });
  }

  ngOnInit(): void {
    this.carrierService
      .getCarrierById(this.carrier_id)
      .subscribe((res: User) => {
        this.carrier = res;
        this.stars = Array(Math.round(this.carrier.stars)).fill(0);
      });

    this.carrierService
      .getVehiclesByCarrierId(this.carrier_id)
      .subscribe((res: Vehicle[]) => {
        this.vehicles = res;
      });

    this.carrierService
      .getExperiencesByCarrierId(this.carrier_id)
      .subscribe((res: Experience[]) => {
        this.experiences = res;
      });

    this.contractService.getComments().subscribe((res: Comment[]) => {
      this.comments = res;
    });
    // this.onPageChange;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  onPageChange(event: PageEvent) {
    // const startIndex = event.pageIndex * event.pageSize;
    // let endIndex = startIndex + event.pageSize;
    // if (endIndex > this.comments.length) {
    //   endIndex = this.comments.length;
    // }
    // this.pageSlice = this.comments.slice(startIndex, endIndex);
  }

  goRequestService() {
    this.router.navigate([`/request-service/${this.carrier_id}`]);
  }

  openCommentModal() {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      width: '250px',
      data: this.commentData,
    });
    console.log(this.commentData);
    // dialogRef.afterClosed().subscribe((result) => {
    //   this.commentData.comment = result.comment;
    //   this.commentData.star = result.rating;
    //   this.saveComment().subscribe((data: any) => {
    //     console.log(data);
    //     this.ngOnInit();
    //   });
    // });
  }

  saveComment() {
    // return this.http.post(
    //   `${this.basePath}/comments/add/${localStorage.getItem('currentUser')}/${
    //     this.id
    //   }`,
    //   this.commentData,
    //   this.httpOptions
    // );
  }
}
