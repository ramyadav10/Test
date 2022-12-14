import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechstackDialogComponent } from './techstack-dialog.component';

describe('TechstackDialogComponent', () => {
  let component: TechstackDialogComponent;
  let fixture: ComponentFixture<TechstackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechstackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechstackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
