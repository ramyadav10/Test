import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteconfirmProgramTypeComponent } from './deleteconfirm-program-type.component';

describe('DeleteconfirmProgramTypeComponent', () => {
  let component: DeleteconfirmProgramTypeComponent;
  let fixture: ComponentFixture<DeleteconfirmProgramTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteconfirmProgramTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteconfirmProgramTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
