import { Component, OnInit } from '@angular/core';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, retry, throwError} from "rxjs";

interface Vehicle {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css']
})
export class SearchVehicleComponent implements OnInit {

  filteredVehicules: any;

  searchForm: FormGroup = this.formBuilder.group({
    Type_s: ['Bus', {updateOn: 'change' }],
    Size_s: ['Bus', {updateOn: 'change' }]
  });

  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }


  Type: Vehicle[] = [
    {value: 'vehicle-0', viewValue: 'Bus'},
    {value: 'vehicle-1', viewValue: 'Van'},
    {value: 'vehicle-2', viewValue: 'Cargo Truck'},
    {value: 'vehicle-3', viewValue: 'Truck'},
  ];

  constructor(private formBuilder:FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  get Type_s() {
    return this.searchForm.get('Type_s')?.value;
  }

  get Size_s() {
    return this.searchForm.get('Size_s')?.value;
  }

  getVehicules():Observable<any>{
    return this.http.get<any>(`${this.basePath}vehicles?_expand=driver&typeOfCar=${this.Type_s}&&quantity=${this.Size_s}`,this.httpOptions);
  }

  listSearch() {
    this.getVehicules().subscribe((data: any) => {
      this.filteredVehicules = data;
    });
    console.log(this.filteredVehicules)
  }

  goToDriver(id: any) {
    //this.router.navigate([`my-profile-d/`])
    this.router.navigate([`profile/${id}`])
    localStorage.setItem('visitDriverId', id)
  }

}
