import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInviteComponent } from './trip-invite.component';

describe('TripInviteComponent', () => {
  let component: TripInviteComponent;
  let fixture: ComponentFixture<TripInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripInviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
