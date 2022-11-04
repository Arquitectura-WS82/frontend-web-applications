import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSettingsDComponent } from './settings-d.component';

describe('CardSettingsDComponent', () => {
  let component: CardSettingsDComponent;
  let fixture: ComponentFixture<CardSettingsDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSettingsDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSettingsDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
