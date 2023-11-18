import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from '@models/vehicle';
import { CarrierService } from '@services/CarrierService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css'],
})
export class SearchVehicleComponent implements OnInit {
  filteredVehicles: Vehicle[];
  vehicles: Vehicle[];
  defaultImage = '../../../../assets/img/user-vector.png';

  searchForm: FormGroup = this.formBuilder.group({
    type: ['', { updateOn: 'change' }],
    quantity: [1, { updateOn: 'change' }],
  });

  constructor(
    private carrierService: CarrierService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.vehicles = [] as Vehicle[];
    this.filteredVehicles = [] as Vehicle[];
  }

  ngOnInit(): void {
    this.carrierService.getVehicles().subscribe((res: any) => {
      this.vehicles = res;
      this.searchForm.value.type = this.vehicles[0].type;
    });
  }

  filterVehicles() {
    this.filteredVehicles = this.vehicles.filter(
      (vehicle) => vehicle.type === this.searchForm.value.type
    );
  }

  goToDriver(id: any) {
    this.router.navigate([`profile/${id}`]);
    localStorage.setItem('visitDriverId', id);
  }
}
