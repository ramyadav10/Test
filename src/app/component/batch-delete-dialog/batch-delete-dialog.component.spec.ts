import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDeleteDialogComponent } from './batch-delete-dialog.component';

describe('BatchDeleteDialogComponent', () => {
  let component: BatchDeleteDialogComponent;
  let fixture: ComponentFixture<BatchDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
