import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileDComponent } from './my-profile-d.component';

describe('MyProfileDComponent', () => {
  let component: MyProfileDComponent;
  let fixture: ComponentFixture<MyProfileDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
