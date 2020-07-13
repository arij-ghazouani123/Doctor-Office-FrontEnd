import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitDialogComponent } from './add-visit-dialog.component';

describe('AddVisitDialogComponent', () => {
  let component: AddVisitDialogComponent;
  let fixture: ComponentFixture<AddVisitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVisitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
