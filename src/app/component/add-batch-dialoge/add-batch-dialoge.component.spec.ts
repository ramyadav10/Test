import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatchDialogeComponent } from './add-batch-dialoge.component';
describe('AddBatchDialogeComponent', () => {
  let component: AddBatchDialogeComponent;
  let fixture: ComponentFixture<AddBatchDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBatchDialogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatchDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
