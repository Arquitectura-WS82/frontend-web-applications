import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupP2Component } from './signup-p2.component';

describe('SignupP2Component', () => {
  let component: SignupP2Component;
  let fixture: ComponentFixture<SignupP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupP2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
