import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMentorDetailsComponent } from './show-mentor-details.component';

describe('ShowMentorDetailsComponent', () => {
  let component: ShowMentorDetailsComponent;
  let fixture: ComponentFixture<ShowMentorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMentorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMentorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
