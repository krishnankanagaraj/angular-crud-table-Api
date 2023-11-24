import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm!:FormGroup
  btnText='Submit'
  selectedUser!:any
  constructor(private fb:FormBuilder,private apiService:ApiService){
    this.apiService.userSelected.subscribe(user=>{
      this.selectedUser=user;
      const {firstname,lastname,email,bookname,phone,price,quantity}=user
      this.myForm.setValue({firstname,lastname,email,phone,price,bookname,quantity})
      this.btnText="Update"
    })
    }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      bookname:[''],
      phone:[Number],
      price:[Number],
      quantity:[1],
    })
  }
  addUser(){
    if(this.btnText==='Submit'){
      if(this.myForm.valid){
        this.apiService.addUser(this.myForm.value) 
        this.myForm.reset()
      }
      else{
        alert("Fill all fields")
      }
    }else if(this.btnText==="Update"){
      const obj={...this.myForm.value,_id:this.selectedUser._id}
      console.log(obj)
      this.apiService.updateOrder(obj)
      this.myForm.reset()
      this.btnText="Submit"
    }
  }
  deleteUsers(){
    this.apiService.deleteUsers()
  }
}
