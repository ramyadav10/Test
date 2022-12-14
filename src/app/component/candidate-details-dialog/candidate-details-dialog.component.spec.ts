import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailsDialogComponent } from './candidate-details-dialog.component';

describe('CandidateDetailsDialogComponent', () => {
  let component: CandidateDetailsDialogComponent;
  let fixture: ComponentFixture<CandidateDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
