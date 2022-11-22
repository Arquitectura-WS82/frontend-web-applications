import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Experience } from 'src/app/models/Experience/Experience';

@Component({
  selector: 'app-my-profile-d',
  templateUrl: './my-profile-d.component.html',
  styleUrls: ['./my-profile-d.component.css'],
})
export class MyProfileDComponent implements OnInit {
  jobs: any;
  user: any;
  comments: any;
  user_id: any;
  vehicle: any;
  show: boolean = false;
  pageSlice: any;
  vehicleForm!: FormGroup;
  experienceForm!: FormGroup;
  experience: Experience;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.experience = {} as Experience;
  }

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  ngOnInit(): void {

    

    //localStorage.setItem('currentUser', '5');
    if (localStorage.getItem('visitDriverId') != '-1')
      this.user_id = localStorage.getItem('visitDriverId');
    else this.user_id = localStorage.getItem('currentUser');
    localStorage.setItem('visitDriverId', '-1');


    this.getUser(this.user_id).subscribe((data: any) => {
      this.user = data;
    });

    this.getVehicle(this.user_id).subscribe((data: any) => {
      this.vehicle = data;
    });

    this.getJobs(this.user_id).subscribe((data: any) => {
      this.jobs = data;
      this.experienceForm = this.formBuilder.group({
        Jobs: new FormControl(this.jobs[0].job, [Validators.required]),
        Time: new FormControl(this.jobs[0].time, [Validators.required]),
      });
      this.vehicleForm = this.formBuilder.group({
        Quantity: new FormControl(this.vehicle.quantity, [Validators.required]),
        Brand: new FormControl(this.vehicle.brand, [Validators.required]),
        Category: new FormControl(this.vehicle.category, [Validators.required]),
        Typecar: new FormControl(this.vehicle.type_car, [Validators.required]),
        Photo: new FormControl(this.vehicle.photo_car, [Validators.required]),
      });

    });
    this.getComments(this.user_id).subscribe((data: any) => {
      this.comments = data;
      this.pageSlice = this.comments.slice(0, 3);

    });



    this.vehicleForm.value.Brand = this.vehicle.brand;
    this.vehicleForm.value.Quantity = this.vehicle.quantity;
    this.vehicleForm.value.Typecar = this.vehicle.type_car;
    this.vehicleForm.value.Category = this.vehicle.category;
    this.vehicleForm.value.Photo = this.vehicle.photo_car;

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
  Updateexpe() {
    this.show = !this.show;
    this.experience.time = this.experienceForm.value.Time;
    this.experience.job = this.experienceForm.value.Jobs;

    this.http
      .put(`${this.basePath}/experience/${this.user_id}`, this.experience, this.httpOptions)
      .subscribe((res) => {
        console.log(res);
        //alert('Registro exitoso');
      });
    this.ngOnInit();
  }

  Update() {
    this.show = !this.show;
    this.vehicle.brand = this.vehicleForm.value.Brand;
    this.vehicle.quantity = this.vehicleForm.value.Quantity;
    this.vehicle.type_car = this.vehicleForm.value.Typecar;
    this.vehicle.category = this.vehicleForm.value.Category;
    this.vehicle.photo_car = this.vehicleForm.value.Photo;
    this.http
      .put(`${this.basePath}/vehicle/${this.user_id}`, this.vehicle, this.httpOptions)
      .subscribe((res) => {
        console.log(res);
        //alert('Registro exitoso');

      });
    this.ngOnInit();
  }

  getVehicle(id: any) {
    return this.http.get(`${this.basePath}/vehicle/${id}`);
  }

  getUser(id: any) {
    return this.http.get(`${this.basePath}/drivers/${id}`);
  }
  getJobs(id: number) {
    return this.http.get(`${this.basePath}/experience/${id}`);
  }
  getComments(id: any) {
    return this.http.get(`${this.basePath}/comments/driver/${id}`);
  }
}
