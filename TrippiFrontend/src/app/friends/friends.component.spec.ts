import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRouteStub } from '../testing/activatedRouteStub';

import { FriendsComponent } from './friends.component';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  let service: ApiServiceService;
  let activeRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsComponent ],
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
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('onSubmit should create a friend', async () => {
  //   let user1 = {
  //     id: 0,
  //     username: '',
  //     friends: []
  //   }
  //   // spyOn(component, 'onSubmit').and.returnValue();
  //   let buttonElement = fixture.debugElement.query(By.css('table'));;
  //   spyOn(component, 'onSubmit');
  //   await buttonElement.triggerEventHandler('click', user1);
  //   fixture.detectChanges();
  //   expect(component.onSubmit).toHaveBeenCalled();

    
  // });
});


