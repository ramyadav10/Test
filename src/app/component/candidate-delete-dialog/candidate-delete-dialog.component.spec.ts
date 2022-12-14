import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDeleteDialogComponent } from './candidate-delete-dialog.component';

describe('CandidateDeleteDialogComponent', () => {
  let component: CandidateDeleteDialogComponent;
  let fixture: ComponentFixture<CandidateDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
