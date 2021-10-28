import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRouteStub } from '../testing/activatedRouteStub';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ApiServiceService;
  let activeRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: activeRoute
      }
    ],
      
    })
    .compileComponents();
    service = TestBed.inject(ApiServiceService);
  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    activeRoute.setParams();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call onSubmit when button is clicked', () => {
  //   spyOn(component, 'onSubmit');
  //   let btn = fixture.debugElement.query(By.css('button'));
  //   btn.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(component.onSubmit).toHaveBeenCalled();
  
  // });
});


