import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIDComponent } from './show-id.component';

describe('ShowIDComponent', () => {
  let component: ShowIDComponent;
  let fixture: ComponentFixture<ShowIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
