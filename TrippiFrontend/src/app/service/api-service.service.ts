import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { tripStart } from '../model/tripStart';

import { tripOptions } from '../model/tripOptions';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  rootUrl: string =  'https://p2trippiapi.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  getRouteOptions(tripStart: tripStart) : Promise<[]>
  {
    return this.http.get<[]>(this.rootUrl + "/" + tripStart).toPromise();
  }

}
