import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotDeleteconfirmComponent } from './timeslot-deleteconfirm.component';

describe('TimeslotDeleteconfirmComponent', () => {
  let component: TimeslotDeleteconfirmComponent;
  let fixture: ComponentFixture<TimeslotDeleteconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeslotDeleteconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotDeleteconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
