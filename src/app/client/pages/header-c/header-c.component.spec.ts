import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCComponent } from './header-c.component';

describe('HeaderCComponent', () => {
  let component: HeaderCComponent;
  let fixture: ComponentFixture<HeaderCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
