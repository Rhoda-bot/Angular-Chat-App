import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public fb:FormBuilder,public router:Router, public _chat_service:ChatsService) { }
  public loginForm:FormGroup;
  public getReg_Users=[];
  allUsers

  ngOnInit(): void {
    this.loginForm =this.fb.group({
      email:['',Validators.email],
      password:['',Validators.minLength(5)]
    })

    this.allUsers=this._chat_service.getAllusers;
  }
  loginUser(){
    

    let loggedUser = this._chat_service.getAllusers.find((u) => (u.email == this.loginForm.value.email) && (u.password == this.loginForm.value.password));


    if(loggedUser){
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      this.router.navigate(['/home'])
      // this.router.navigate([`/home/${loggedUser.id}`])
    } else {
      return this.router.navigate(['/sign-up']);
    }
    
  
//     if ( !getLoggein_User_Info ) {
//       this.router.navigate(['/sign-up']);
//       console.log("he");
      
        
//     }else{
//   getLoggein_User_Info.login=true;
//   // console.log(getLoggein_User_Info);
//  let i= this.allUsers.indexOf(getLoggein_User_Info);
// this.allUsers[i]=getLoggein_User_Info;
// this._chat_service.getAllusers[i].login=true;

// localStorage.setItem("Register-users",JSON.stringify(this.allUsers));

 
  
      
      // this._chat_service.getAllusers.find
      
    // }
  
  }

}
