import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSheetDialogComponent } from './mentor-sheet-dialog.component';

describe('MentorSheetDialogComponent', () => {
  let component: MentorSheetDialogComponent;
  let fixture: ComponentFixture<MentorSheetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorSheetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorSheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
