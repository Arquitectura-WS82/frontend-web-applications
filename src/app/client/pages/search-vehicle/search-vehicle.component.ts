import { Component, OnInit } from '@angular/core';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

interface Vehicle {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css'],
})
export class SearchVehicleComponent implements OnInit {
  filteredVehicules: any;

  searchForm: FormGroup = this.formBuilder.group({
    Type_s: ['Bus', { updateOn: 'change' }],
    Size_s: ['Bus', { updateOn: 'change' }],
  });

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  Type: Vehicle[] = [
    { value: 'vehicle-0', viewValue: 'Bus' },
    { value: 'vehicle-1', viewValue: 'Van' },
    { value: 'vehicle-2', viewValue: 'Cargo Truck' },
    { value: 'vehicle-3', viewValue: 'Truck' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get Type_s() {
    return this.searchForm.get('Type_s')?.value;
  }

  get Size_s() {
    return this.searchForm.get('Size_s')?.value;
  }

  getVehicles(): Observable<any> {
    return this.http.get(
      `${this.basePath}/vehicle/find/${this.Type_s}/${this.Size_s}`,
      this.httpOptions
    );
  }

  listSearch() {
    this.getVehicles().subscribe((data: any) => {
      this.filteredVehicules = data;
      console.log(data)
    });
    console.log(this.filteredVehicules);
    console.log(`${this.basePath}/vehicle/find/${this.Type_s}/${this.Size_s}`);
  }

  goToDriver(id: any) {
    this.router.navigate([`profile/${id}`]);
    localStorage.setItem('visitDriverId', id);
  }
}
