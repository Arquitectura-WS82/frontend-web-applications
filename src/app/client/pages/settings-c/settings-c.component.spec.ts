import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCComponent } from './settings-c.component';

describe('SettingsCComponent', () => {
  let component: SettingsCComponent;
  let fixture: ComponentFixture<SettingsCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
