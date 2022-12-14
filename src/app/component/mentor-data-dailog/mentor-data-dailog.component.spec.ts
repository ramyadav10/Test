import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDataDailogComponent } from './mentor-data-dailog.component';

describe('MentorDataDailogComponent', () => {
  let component: MentorDataDailogComponent;
  let fixture: ComponentFixture<MentorDataDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorDataDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorDataDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
