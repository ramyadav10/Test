import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBatchesComponent } from './display-batches.component';

describe('DisplayBatchesComponent', () => {
  let component: DisplayBatchesComponent;
  let fixture: ComponentFixture<DisplayBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
