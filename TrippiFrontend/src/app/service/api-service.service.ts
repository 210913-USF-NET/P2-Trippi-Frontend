import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { tripStart } from '../model/tripStart';
import { user } from '../model/user';
import { friend } from '../model/friend';

import { tripOptions } from '../model/tripOptions';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  rootUrl: string =  'https://p2trippiapi.azurewebsites.net/api/User';
  rootUrl1: string =  'https://p2trippiapi.azurewebsites.net/api/Friend';

  users : user[] = [];
  counter: number = 0;
  private tripStart: tripStart ={
    address: '',
    hours: 0,
    days: 0,
}
  constructor(private http: HttpClient) { }

  getRouteOptions(tripStart: tripStart) : Promise<[]>
  {
    return this.http.get<[]>(this.rootUrl + `route/${tripStart.address}  ${tripStart.hours} ${tripStart.days}`).toPromise();
  }

  addUser(user:user){
    this.http.get<user[]>(this.rootUrl).toPromise().then(result => {
      this.users = result;
      for(let user2 of this.users){
        if (user2.username === user.username){
          break;
        }
        else{
          this.counter++;
          continue;
        }
      }

      if(this.counter === this.users.length){
        console.log(this.users.length);
        this.http.post<user>(this.rootUrl, user).toPromise();
      }
      
    });
  }

  getUsers(): Promise<user[]>
  {
    return this.http.get<user[]>(this.rootUrl).toPromise();
  }

  getOneUser(id: number): Promise<user>
  {
    return this.http.get<user>(this.rootUrl + "/" + id).toPromise();
  }

  addFriend(friend: friend){
    this.http.post<friend>(this.rootUrl1, friend).toPromise();
  }

  setTrip( tripForm: tripStart) {      
    this.tripStart = tripForm;  
  }  
  
  getTrip() {  
    return this.tripStart ;  
  }  
}
