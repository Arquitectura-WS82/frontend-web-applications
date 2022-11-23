import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router) {}
  type: any;

  ngOnInit(): void {
    this.type = localStorage.getItem('typeofuser')

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
