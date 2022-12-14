import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorDialogComponent } from './coordinator-dialog.component';

describe('CoordinatorDialogComponent', () => {
  let component: CoordinatorDialogComponent;
  let fixture: ComponentFixture<CoordinatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
