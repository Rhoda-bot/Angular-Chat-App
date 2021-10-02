import { Injectable } from '@angular/core';

@Injectable({ 
  providedIn: 'root'
})
export class ChatsService {

  constructor() { }
  public getAllusers = JSON.parse(localStorage.getItem("Register-users")) || []
  
  filteredGetAllUsers(data){
   return this.getAllusers.filter(val=>val.id!=data)
  }
  findLoggedUser(data){
    return this.getAllusers.find(val=>val.id==data);
  }

  LoggedUser(){
    let getlogged = JSON.parse(localStorage.loggedUser);
    // console.log(getlogged);
    
    return getlogged;
  }
}
