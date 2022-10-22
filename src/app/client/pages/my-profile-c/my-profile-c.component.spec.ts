import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileCComponent } from './my-profile-c.component';

describe('MyProfileCComponent', () => {
  let component: MyProfileCComponent;
  let fixture: ComponentFixture<MyProfileCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
