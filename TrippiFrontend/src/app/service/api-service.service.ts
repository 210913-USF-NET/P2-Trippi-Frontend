import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { tripStart } from '../model/tripStart';
<<<<<<< HEAD
import { TripOptions } from '../model/tripOptions';
=======
import { tripOptions } from '../model/tripOptions';
>>>>>>> b57c7a4589762433d4e1cef5725161fd6ba674ca

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
<<<<<<< HEAD
rootUrl: string =  'https://p2trippiapi.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  getRouteOptions(tripStart: tripStart): Promise<TripOptions>
  {
    return this.http.post<TripOptions>(this.rootUrl, tripStart).toPromise();
  }
  
=======

  rootUrl: string =  'https://p2trippiapi.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  getRouteOptions(tripStart: tripStart) : Promise<[]>
  {
    return this.http.get<[]>(this.rootUrl + "/" + tripStart).toPromise();
  }
>>>>>>> b57c7a4589762433d4e1cef5725161fd6ba674ca
}
