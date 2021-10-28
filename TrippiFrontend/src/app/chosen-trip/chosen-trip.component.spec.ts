// import { GoogleMapsAPIWrapper } from '@agm/core';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthModule } from '@auth0/auth0-angular';
// import { ApiServiceService } from '../service/api-service.service';
// import { ActivatedRouteStub } from '../testing/activatedRouteStub';

// import { ChosenTripComponent } from './chosen-trip.component';

//     describe('ChosenTripComponent', () => {
//     let component: ChosenTripComponent;
//     let fixture: ComponentFixture<ChosenTripComponent>;
//     let service: ApiServiceService;
//     let activeRoute: ActivatedRouteStub = new ActivatedRouteStub();

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//         declarations: [ ChosenTripComponent ],
//         imports: [RouterTestingModule, HttpClientTestingModule, AuthModule.forRoot({
//             domain: 'YOURTENANTDOMAIN.DATACENTER.auth0.com',
//                 clientId: '...',
//         })],
//         providers: [{
//             provide: ActivatedRoute,
//             useValue: activeRoute
//         }
//         ]
//         })
//         .compileComponents();
//         service = TestBed.inject(ApiServiceService);
//     });

//     beforeEach(() => {
        
//         fixture = TestBed.createComponent(ChosenTripComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
    
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//     });
