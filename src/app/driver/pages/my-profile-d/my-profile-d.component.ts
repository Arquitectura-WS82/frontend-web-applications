import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Comment } from '@models/comment';
import { Experience } from '@models/experience';
import { User } from '@models/user';
import { Vehicle } from '@models/vehicle';
import { CarrierService } from '@services/CarrierService';
import { CommentService } from '@services/CommentService';
import {
  AddInfoOneComponent,
  DescriptionData,
} from 'src/app/components/add-info-one/add-info-one.component';

@Component({
  selector: 'app-my-profile-d',
  templateUrl: './my-profile-d.component.html',
  styleUrls: ['./my-profile-d.component.css'],
})
export class MyProfileDComponent implements OnInit {
  experiences: Experience[];
  comments: Comment[];
  vehicles: Vehicle[];
  carrier: User;
  user_id: any;
  show: boolean = false;
  stars: number[];
  vehicleForm!: FormGroup;
  experienceForm!: FormGroup;
  descriptionData: DescriptionData;
  defaultImage: string = '../../../../assets/img/user-vector.png';
  pageSlice: any;

  constructor(
    private carrierService: CarrierService,
    private contractService: CommentService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.experiences = [] as Experience[];
    this.vehicles = [] as Vehicle[];
    this.comments = [] as Comment[];
    this.pageSlice = [] as Comment[];
    this.carrier = {} as User;
    this.descriptionData = {} as DescriptionData;
    this.stars = [] as number[];

    this.experienceForm = this.formBuilder.group({
      job: new FormControl('', [Validators.required]),
      years: new FormControl('', [Validators.required]),
    });

    this.vehicleForm = this.formBuilder.group({
      quantity: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');

    this.carrierService.getCarrierById(this.user_id).subscribe((res: User) => {
      this.carrier = res;
      this.stars = Array(Math.round(this.carrier.stars)).fill(0);
    });

    this.carrierService
      .getVehiclesByCarrierId(this.user_id)
      .subscribe((res: Vehicle[]) => {
        this.vehicles = res;
      });

    this.carrierService
      .getExperiencesByCarrierId(this.user_id)
      .subscribe((res: Experience[]) => {
        this.experiences = res;
      });

    // this.contractService.getComments().subscribe((res: Comment[]) => {
    //   this.comments = res;
    // });
    this.contractService.getComments().subscribe((res: Comment[]) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].contract.carrier.id == parseInt(localStorage.getItem('currentUser') || '')) {
          this.comments.push(res[i]);
        }
      }
      this.pageSlice = this.comments.slice(0, 3);
    });

     this.onPageChange;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddInfoOneComponent, {
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.comments.length) {
      endIndex = this.comments.length;
    }
    this.pageSlice = this.comments.slice(startIndex, endIndex);
  }

  updateExperience() {
    this.show = !this.show;
    let experience = {} as Experience;

    experience.years = this.experienceForm.value.years;
    experience.job = this.experienceForm.value.job;

    this.ngOnInit();
  }

  updateVehicle() {
    this.show = !this.show;
    let vehicle = {} as Vehicle;

    vehicle.quantity = this.vehicleForm.value.quantity;
    vehicle.type = this.vehicleForm.value.type;
    vehicle.photo = this.vehicleForm.value.photo;

    this.ngOnInit();
  }

  openDescriptionModal() {
    const dialogRef = this.dialog.open(AddInfoOneComponent, {
      width: '250px',
      data: this.descriptionData,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.user.description = result.Description;
    //   console.log(this.user);
    //   this.saveDescription().subscribe((data: any) => {
    //     console.log(data);
    //     this.ngOnInit();
    //   });
    // });
  }

  saveDescription() {
    // return this.http.put(
    //   `${this.basePath}/drivers/${this.user_id}`,
    //   `${this.basePath}/personal-data/carrier/${this.user_id}`,
    //   this.user,
    //   this.httpOptions
    // );
  }
}
