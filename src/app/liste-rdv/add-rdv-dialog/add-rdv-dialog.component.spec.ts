import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRdvDialogComponent } from './add-rdv-dialog.component';

describe('AddRdvDialogComponent', () => {
  let component: AddRdvDialogComponent;
  let fixture: ComponentFixture<AddRdvDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRdvDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRdvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
