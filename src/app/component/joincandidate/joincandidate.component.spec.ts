import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoincandidateComponent } from './joincandidate.component';

describe('JoincandidateComponent', () => {
  let component: JoincandidateComponent;
  let fixture: ComponentFixture<JoincandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoincandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoincandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
