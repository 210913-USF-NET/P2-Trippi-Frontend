import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { NavbarComponent } from './navbar/navbar.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { HomeComponent } from './home/home.component';
import { RouteDisplayComponent } from './route-display/route-display.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { FriendprofileComponent } from './friendprofile/friendprofile.component';
import { RatingsComponent } from './ratings/ratings.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { TripdetailsComponent } from './tripdetails/tripdetails.component';

import { ChosenTripComponent } from './chosen-trip/chosen-trip.component';
import { TripInviteComponent } from './trip-invite/trip-invite.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TripFormComponent,
    HomeComponent, 
    RouteDisplayComponent,
    AuthComponent,
    FriendsComponent,
    FriendprofileComponent,

    RatingsComponent,
    TripHistoryComponent,
    TripdetailsComponent,
    //GooglePlaceModule

    ChosenTripComponent,
    TripInviteComponent

  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-ow5ha2t0.us.auth0.com',
      clientId: 'G9Vc3asT1QL9PR5vfNtC0zIAIlJwNpon'
    }),
    RouterModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
