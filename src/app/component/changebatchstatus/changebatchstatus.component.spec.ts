import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangebatchstatusComponent } from './changebatchstatus.component';

describe('ChangebatchstatusComponent', () => {
  let component: ChangebatchstatusComponent;
  let fixture: ComponentFixture<ChangebatchstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangebatchstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangebatchstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
