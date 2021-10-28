import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRouteStub } from '../testing/activatedRouteStub';

import { TripdetailsComponent } from './tripdetails.component';

describe('TripdetailsComponent', () => {
  let component: TripdetailsComponent;
  let fixture: ComponentFixture<TripdetailsComponent>;
  let service: ApiServiceService;
  let activeRoute: ActivatedRouteStub = new ActivatedRouteStub();
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripdetailsComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot({
        domain: 'YOURTENANTDOMAIN.DATACENTER.auth0.com',
            clientId: '...',
      })],
      providers: [{
        provide: ActivatedRoute,
        useValue: activeRoute
      }
      ]
    })
    .compileComponents();
    service = TestBed.inject(ApiServiceService);
    router = TestBed.inject(Router);
  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
