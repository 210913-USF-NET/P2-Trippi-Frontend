import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { user } from '../model/user';
import { ApiServiceService } from '../service/api-service.service';


@Component({
  selector: 'app-friendprofile',
  templateUrl: './friendprofile.component.html',
  styleUrls: ['./friendprofile.component.css']
})
export class FriendprofileComponent implements OnInit {

  constructor(private currnetRoute: ActivatedRoute, private fService:ApiServiceService) { }

  name: string = '';
  user1: user = {
    id: 0,
    username: '',
    friends: []
  }

  ngOnInit(): void {
    this.currnetRoute.params.subscribe(params => {
      this.name = params["name"];
      this.fService.getUsers().then(users =>{
        for(let user of users){
          if(user.username === this.name){
            this.user1 = user;
          }
        }
      })
    })
  }

}
