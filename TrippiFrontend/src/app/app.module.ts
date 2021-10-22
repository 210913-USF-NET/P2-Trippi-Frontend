import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { HomeComponent } from './home/home.component';
import { RouteDisplayComponent } from './route-display/route-display.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TripFormComponent,
    HomeComponent,
    RouteDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'route-display', component: RouteDisplayComponent},
      {path: 'trip-forms', component: TripFormComponent},
      {path: '', component: HomeComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
