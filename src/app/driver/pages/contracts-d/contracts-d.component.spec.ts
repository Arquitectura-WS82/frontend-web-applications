import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsDComponent } from './contracts-d.component';

describe('ContractsDComponent', () => {
  let component: ContractsDComponent;
  let fixture: ComponentFixture<ContractsDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
