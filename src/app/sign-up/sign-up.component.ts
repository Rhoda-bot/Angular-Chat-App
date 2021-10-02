import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public fb:FormBuilder, public router:Router) { }
  public userForm:FormGroup;
  public storeUserForm =[];

  ngOnInit(): void {
      this.userForm = this.fb.group({
        fName:['',Validators.minLength(3)],
        lName:['',Validators.minLength(3)],
        email:['',Validators.minLength(10)],
        phone:['',Validators.maxLength(11)],
        password:['',Validators.minLength(5)],
        id :[Math.floor(Math.random()*1000)],
        messages:[[]],
        login:false

      
      })
  }
  submitForm(){
    let values = this.userForm.value
    if (!this.userForm.value.fName 
    ||!this.userForm.value.lName|| !this.userForm.value.email|| !this.userForm.value.password) {
      console.log("input must be filled");
      alert("input must be filled")
      
    }else{
      let a =JSON.parse(localStorage.getItem("Register-users")) || [];
      let d = [...a,values]
      console.log(d);
      localStorage.setItem("Register-users",JSON.stringify(d));
      alert("u have successfully registered");
      this.router.navigate(['/sign-in']); 
    }
    
  }

}
