import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TripFormComponent } from './trip-form/trip-form.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { RouteDisplayComponent } from './route-display/route-display.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendprofileComponent } from './friendprofile/friendprofile.component';
import { ChosenTripComponent } from './chosen-trip/chosen-trip.component';

const routes: Routes = [
  {
    path: 'trips',
    component: TripFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form',
    component: TripFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'route',
    component: RouteDisplayComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'mytrip',
  component: ChosenTripComponent,
  canActivate: [AuthGuard]
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'friend/:name',
    component: FriendprofileComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
