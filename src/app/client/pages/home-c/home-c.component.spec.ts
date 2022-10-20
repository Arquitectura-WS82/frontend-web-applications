import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCComponent } from './home-c.component';

describe('HomeCComponent', () => {
  let component: HomeCComponent;
  let fixture: ComponentFixture<HomeCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
