import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitDialogComponent } from './edit-visit-dialog.component';

describe('EditVisitDialogComponent', () => {
  let component: EditVisitDialogComponent;
  let fixture: ComponentFixture<EditVisitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
