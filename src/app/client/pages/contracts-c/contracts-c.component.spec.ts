import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsCComponent } from './contracts-c.component';

describe('ContractsCComponent', () => {
  let component: ContractsCComponent;
  let fixture: ComponentFixture<ContractsCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
