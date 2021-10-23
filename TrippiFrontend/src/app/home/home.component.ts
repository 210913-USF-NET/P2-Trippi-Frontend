import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { user } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

<<<<<<< HEAD
  constructor(private trippiService: ApiServiceService, private auth: AuthService, private router: Router) { }
=======
  constructor( private auth: AuthService, private router: Router) { }

  isLoggedIn: boolean = false;

  user: user = {
    username: ''
  }

  authuser: string | undefined = '';
>>>>>>> d7f8892fedd7123f0a48cc29125a6ab61d6b9e21
  
  ngOnInit(): void {
    
    }
  
  onSubmit(): void{
    this.router.navigate(['form'])
    console.log(this.router);
  }

}
