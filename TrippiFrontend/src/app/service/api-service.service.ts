import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
rootUrl: string =  'https://p2trippiapi.azurewebsites.net/api/';



  constructor(private http: HttpClient) { }
}
