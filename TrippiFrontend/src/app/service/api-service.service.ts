import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { tripStart } from '../model/tripStart';
import { user } from '../model/user';

import { tripOptions } from '../model/tripOptions';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  rootUrl: string =  'https://p2trippiapi.azurewebsites.net/api/User';
  users : user[] = [];
  counter: number = 0;

  constructor(private http: HttpClient) { }

  getRouteOptions(tripStart: tripStart) : Promise<[]>
  {
    return this.http.get<[]>(this.rootUrl + "/" + tripStart).toPromise();
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

  getTrips() : Promise<[]>
  {
    return this.http.get<[]>(this.rootUrl + "/Trip").toPromise();
  }
}
