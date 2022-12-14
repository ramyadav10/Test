import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeSlotDialogComponent } from './new-time-slot-dialog.component';

describe('NewTimeSlotDialogComponent', () => {
  let component: NewTimeSlotDialogComponent;
  let fixture: ComponentFixture<NewTimeSlotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTimeSlotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeSlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
