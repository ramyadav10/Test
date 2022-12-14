import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemapdialogComponent } from './remapdialog.component';

describe('RemapdialogComponent', () => {
  let component: RemapdialogComponent;
  let fixture: ComponentFixture<RemapdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemapdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemapdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
