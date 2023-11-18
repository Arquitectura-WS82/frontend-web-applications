import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

import { MatDialog } from '@angular/material/dialog';
import {
  AddInfoOneComponent,
  DescriptionData,
} from 'src/app/components/add-info-one/add-info-one.component';
import { User } from '@app/models/user';
import { CarrierService } from '@app/services/CarrierService';
import { Experience } from '@app/models/experience';
import { Vehicle } from '@app/models/vehicle';

@Component({
  selector: 'app-my-profile-d',
  templateUrl: './my-profile-d.component.html',
  styleUrls: ['./my-profile-d.component.css'],
})
export class MyProfileDComponent implements OnInit {
  experiences: Experience[];
  carrier: User;
  comments: Comment[];
  vehicles: Vehicle[];
  user_id: any;
  show: boolean = false;
  pageSlice: any;
  vehicleForm!: FormGroup;
  experienceForm!: FormGroup;
  descriptionData: DescriptionData;

  constructor(
    private carrierService: CarrierService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.experiences = [] as Experience[];
    this.vehicles = [] as Vehicle[];
    this.comments = [] as Comment[];
    this.carrier = {} as User;
    this.descriptionData = {} as DescriptionData;

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddInfoOneComponent, {
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {
    localStorage.setItem('visitDriverId', '-1');

    if (localStorage.getItem('visitDriverId') != '-1')
      this.user_id = localStorage.getItem('visitDriverId');
    else this.user_id = localStorage.getItem('currentUser');

    localStorage.setItem('visitDriverId', '-1');

    this.carrierService.getCarrierById(this.user_id).subscribe((res: User) => {
      this.carrier = res;
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

    // this.getComments(this.user_id).subscribe((data: any) => {
    //   this.comments = data;
    //   this.pageSlice = this.comments.slice(0, 3);
    // });

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
    //   this.user,
    //   this.httpOptions
    // );
  }
}
