import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramTypeComponent } from './add-program-type.component';

describe('AddProgramTypeComponent', () => {
  let component: AddProgramTypeComponent;
  let fixture: ComponentFixture<AddProgramTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
