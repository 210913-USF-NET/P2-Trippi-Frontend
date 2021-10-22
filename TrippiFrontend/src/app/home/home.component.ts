import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { user } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private trippiService: ApiServiceService, private auth: AuthService, private router: Router) { }

  isLoggedIn: boolean = false;

  user: user = {
    username: ''
  }

  authuser: string | undefined = '';
  
  ngOnInit(): void {
    
    }
  
  onSubmit(): void{
    this.router.navigate(['form'])
    console.log(this.router);
  }

}
