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
<<<<<<< HEAD
import { FriendsComponent } from './friends/friends.component';
=======
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
>>>>>>> d7f8892fedd7123f0a48cc29125a6ab61d6b9e21


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TripFormComponent,
    HomeComponent,
    RouteDisplayComponent,
    AuthComponent,
<<<<<<< HEAD
    FriendsComponent,
=======
    GooglePlaceModule
>>>>>>> d7f8892fedd7123f0a48cc29125a6ab61d6b9e21
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.authDomain,
      clientId: environment.authClientId
    }),
    RouterModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
