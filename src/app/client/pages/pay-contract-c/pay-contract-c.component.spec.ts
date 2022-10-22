import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayContractCComponent } from './pay-contract-c.component';

describe('PayContractCComponent', () => {
  let component: PayContractCComponent;
  let fixture: ComponentFixture<PayContractCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayContractCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayContractCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
