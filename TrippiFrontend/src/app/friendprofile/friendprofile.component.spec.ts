import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRouteStub } from '../testing/activatedRouteStub';

import { FriendprofileComponent } from './friendprofile.component';

    describe('FriendprofileComponent', () => {
    let component: FriendprofileComponent;
    let fixture: ComponentFixture<FriendprofileComponent>;
    let service: ApiServiceService;
    let activeRoute: ActivatedRouteStub = new ActivatedRouteStub();
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ FriendprofileComponent ],
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
        fixture = TestBed.createComponent(FriendprofileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    });
