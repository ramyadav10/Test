import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechstackDeleteconfirmComponent } from './techstack-deleteconfirm.component';

describe('TechstackDeleteconfirmComponent', () => {
  let component: TechstackDeleteconfirmComponent;
  let fixture: ComponentFixture<TechstackDeleteconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechstackDeleteconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechstackDeleteconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
