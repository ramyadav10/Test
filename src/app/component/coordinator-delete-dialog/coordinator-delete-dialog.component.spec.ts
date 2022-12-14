import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorDeleteDialogComponent } from './coordinator-delete-dialog.component';

describe('CoordinatorDeleteDialogComponent', () => {
  let component: CoordinatorDeleteDialogComponent;
  let fixture: ComponentFixture<CoordinatorDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
