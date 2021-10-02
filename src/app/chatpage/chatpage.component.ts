import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit {

  constructor(public actRoute:ActivatedRoute,public _chat_service:ChatsService) { }
  user_id;
  other_users:any=[];
  chat_Partner:any=[];
  user_info:any=[];
  public message ="";
  public arrMessages:any=[];
  allReceiverMessages=[];
  allSenderMessages=[]
  chat_partner_id;
  allMessages=[];
  user_info_arr=[];
  allUsers=[]
  senderMsg;
  receiverMsg
  index_Of_Logged_User
  index_Of_chatpart;
  currentMessages=[];
  senderMsgDetails;
  senderMsgHistoryIndex;
  receiverHistoryIndex ;
  receiverMsgDetails
  searchbox;

  ngOnInit(): void { 
   this.other_users =this._chat_service.getAllusers.filter((val,i)=>+val.id!=+this._chat_service.LoggedUser().id);
   let paramsId; 
    this.actRoute.paramMap.subscribe(data=>{
    paramsId=data.get('id')
     
   })

  }
  view(arg){
    
    
    // allUser is get all the registered people on the platform.
  this.allUsers =this._chat_service.getAllusers;
  // this.chat_partner_id is holding the id of the person we're chatting with
  this.chat_partner_id=arg;
  // this.chat_Parner is fetching the details of the person we're chating with from the localstorage;
  this.chat_Partner= this._chat_service.findLoggedUser(arg);
  //this.user_info is fetching the details of the logged in user
  this.user_info =this._chat_service.getAllusers.find(val=>val.id==this._chat_service.LoggedUser().id);
   //index_of_logged_user is checking for the index of the current logged in person
this.index_Of_Logged_User = this.allUsers.indexOf(this.user_info);
  //index_of_chatpart is also checking for the index of the person we're chatting with currently
  this.index_Of_chatpart=this.allUsers.indexOf(this.chat_Partner);
  
  
  //checking the sender's array, if there is no existing chat btw both parties, create one with receiver's iD
  this.user_info_arr.push(this.user_info);
  // console.log(allUser[index_Of_Logged_User].messages)
  this.senderMsg = this.allUsers[this.index_Of_Logged_User].messages.find((val,i)=>this.allUsers[this.index_Of_Logged_User].messages[i].Id==arg);
  if (!this.senderMsg) {
    let obj =
    {
      Id:arg,
      senderMsg:[],
      receiverMsg:[]
    };

    this.allUsers[this.index_Of_Logged_User].messages.push(obj)
    
  }
  
  // console.log(allUser[index_Of_Logged_User].messages)

  
  //check receiver's Array, if there is no existing chat, then create one with the sender's id

 this.receiverMsg = this.allUsers[this.index_Of_chatpart].messages.find((val,i)=> this.allUsers[this.index_Of_chatpart].messages[i].Id==this.user_info.id);
  if (!this.receiverMsg) {
    let obj = {
      Id:this.user_info.id,
      senderMsg:[],
      receiverMsg:[],
    }
  this.allUsers[this.index_Of_chatpart].messages.push(obj);

  
  }
  //index of sender
  this.senderMsgDetails = this.allUsers[this.index_Of_Logged_User].messages.find((val,i)=>this.allUsers[this.index_Of_Logged_User].messages[i].Id==this.allUsers[this.index_Of_chatpart].id)
  this. senderMsgHistoryIndex = this.allUsers[this.index_Of_Logged_User].messages.indexOf(this.senderMsgDetails)
  console.log(this.senderMsgHistoryIndex);
  //index of receiver
    this.receiverMsgDetails =this.allUsers[this.index_Of_chatpart].messages.find((val,i)=>this.allUsers[this.index_Of_chatpart].messages[i].Id==this.allUsers[this.index_Of_Logged_User].id);
     this.receiverHistoryIndex = this.allUsers[this.index_Of_chatpart].messages.indexOf(this.receiverMsgDetails)
   
     console.log( this.receiverMsgDetails );
      this.user_id =this.user_info.id
    
     
    //  console.log(
      //  this.allUsers);
       this.currentMessages=[
        ...this.allUsers[this.index_Of_Logged_User].messages[this.senderMsgHistoryIndex].senderMsg,
        ...this.allUsers[this.index_Of_Logged_User].messages[this.senderMsgHistoryIndex].receiverMsg
      ]
      console.log(this.currentMessages);
 
   let sortedData = this.currentMessages.sort((a,b)=>{
     return a.time-b.time;
   })
   this.currentMessages =sortedData;
  // localStorage.setItem("Register-users",JSON.stringify(this.allUsers));
   
  }
  chat(){
    if (this.message=="") {
      // alert("input must be filled")
    }else{

      let d = new Date();
     let dn= Date.now();
     
    //pushing messages for sender

    this.allUsers[this.index_Of_Logged_User].messages[this.senderMsgHistoryIndex].senderMsg.push({id:this.allUsers[0].id,message:this.message,time:dn})
    //pushing messages for receiver
    this.allUsers[this.index_Of_chatpart].messages[this.receiverHistoryIndex].receiverMsg.push({id:this.allUsers[0].id,message:this.message,time:dn})
    
    
    localStorage.setItem("Register-users",JSON.stringify(this.allUsers));
    this.currentMessages=[
      ...this.allUsers[this.index_Of_Logged_User].messages[this.senderMsgHistoryIndex].senderMsg,
      ...this.allUsers[this.index_Of_Logged_User].messages[this.senderMsgHistoryIndex].receiverMsg
    ]
    
    console.log(this.currentMessages);
    
    }
  
    let sortedData = this.currentMessages.sort((a,b)=>{
      return a.time-b.time;
    })
    this.currentMessages =sortedData;
    
   this.message="";
    
    
   } 
  
    //search input
    search(){
     let a= this._chat_service.getAllusers.filter(val=>val.fName.includes(this.searchbox))
    let b= a.filter(val=>val.id!=a.id)
    
    if (b=="") {
     this.searchbox ="no result found";
     this.searchbox="";
      
    }
     else{
      this.other_users =b;
     }
      
    }
    
    


}
