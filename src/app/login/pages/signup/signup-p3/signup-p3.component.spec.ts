import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupP3Component } from './signup-p3.component';

describe('SignupP3Component', () => {
  let component: SignupP3Component;
  let fixture: ComponentFixture<SignupP3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupP3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
