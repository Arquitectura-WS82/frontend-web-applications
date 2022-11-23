import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoOneComponent } from './add-info-one.component';

describe('AddInfoOneComponent', () => {
  let component: AddInfoOneComponent;
  let fixture: ComponentFixture<AddInfoOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInfoOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInfoOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
