import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenTripComponent } from './chosen-trip.component';

describe('ChosenTripComponent', () => {
  let component: ChosenTripComponent;
  let fixture: ComponentFixture<ChosenTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
