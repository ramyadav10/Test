import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignconfirmComponent } from './unassignconfirm.component';

describe('UnassignconfirmComponent', () => {
  let component: UnassignconfirmComponent;
  let fixture: ComponentFixture<UnassignconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
