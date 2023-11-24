import { HttpClient } from '@angular/common/http';
import { Injectable,OnInit,Output,EventEmitter } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  @Output() userArr= new EventEmitter<any>()
  @Output() userSelected= new EventEmitter<any>()
  users!:any
  url='http://localhost:3000/'
  constructor(private http:HttpClient) {
    this.getAllUsers()
   }
   getAllUsers(){
    console.log('fetch')
    this.http.get(this.url+'get/allData').subscribe(res=>{
      this.users=res;
      this.userArr.emit(this.users)
     })
   }

  ngOnInit(): void {
  }
  addUser(user:any){
    this.http.post(this.url,user).subscribe(res=>{
      this.users.push(res)
      this.userArr.emit(this.users)
    })
  }
  editDelivered(id:any){
    this.http.post(this.url+id,'').subscribe(res=>{
      if(res){
          this.getAllUsers();
      }
    })
  }
  deleteUsers(){
    this.http.delete(this.url).subscribe(res=>{
      if(res){
        this.getAllUsers()
      }
    })
  }
  selectUser(user:any){
    this.userSelected.emit(user)
  }
  updateOrder(data:any){
    this.http.put(this.url+data._id,data).subscribe(res=>{
      if(res){
        console.log(res)
        this.getAllUsers();
      }
     })
  }
}
