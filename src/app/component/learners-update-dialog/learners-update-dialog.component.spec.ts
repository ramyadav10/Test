import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersUpdateDialogComponent } from './learners-update-dialog.component';

describe('LearnersUpdateDialogComponent', () => {
  let component: LearnersUpdateDialogComponent;
  let fixture: ComponentFixture<LearnersUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnersUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnersUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
