import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router, public service:ChatsService) { }

 public coming_Users_Info:any=[];
  ngOnInit(): void {
    this.coming_Users_Info = this.service.LoggedUser();
    
    
  }
  view(){
   
    this.router.navigate([`/chat/${this.coming_Users_Info.id}`])
  }

}
