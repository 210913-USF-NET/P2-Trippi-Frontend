import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRouteStub } from '../testing/activatedRouteStub';
import { tripPost } from '../model/tripPost';
import { RouteDisplayComponent } from './route-display.component';
import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';

describe('RouteDisplayComponent', () => {
  let component: RouteDisplayComponent;
  let fixture: ComponentFixture<RouteDisplayComponent>;
  let service: ApiServiceService;
  let activeRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteDisplayComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot({
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
  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDisplayComponent);
    component = fixture.componentInstance;
    activeRoute.setParams();
    fixture.detectChanges();
    // activeRoute.setParams({address: '1234 Main St', index: 4})
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should have address of 1234 Main St and index 4', () => {
  //   expect(component.selectRoute('1234 Main St', 4)).toBe(void);
    
  // });
  // it('map should create', () => {
  //   expect(component.map).toBeTruthy();
  // });
  it('select Route should return trip', async () => {
    let address: '1234 Main St';
    let index: 1 ;
    let trip: tripPost = {
    id: 1,
    username: 'Mary',
    startAddress: '1234 Main St',
    endAddress: "5595 Grand Dr, St Louis, MO 63112",
    startLat: 0.420453866,
    startLong: -0.714322323e2,
    endLat: 0.420453866e2,
    endLong: -0.8356078468263034,
    rating: []
    }
    spyOn(service, 'getTrip');
    await component.selectRoute('1234 Main St', 4);
    await service.getTrip();
    expect(service.getTrip).toHaveBeenCalled();
    // expect(component.selectRoute('1234 Main St', 4)).toHaveBeenCalled();
  });
});
