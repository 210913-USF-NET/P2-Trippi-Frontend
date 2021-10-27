import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRouteStub } from '../testing/activatedRouteStub';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ApiServiceService;
  let activeRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

