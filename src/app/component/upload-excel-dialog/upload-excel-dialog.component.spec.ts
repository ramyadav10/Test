import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExcelDialogComponent } from './upload-excel-dialog.component';

describe('UploadExcelDialogComponent', () => {
  let component: UploadExcelDialogComponent;
  let fixture: ComponentFixture<UploadExcelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadExcelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExcelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
