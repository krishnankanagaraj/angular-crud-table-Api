import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  users:any[]=[]
  unSortedArr:any[]=[]
  constructor(private apiService:ApiService){}
  ngOnInit(): void {
    this.apiService.userArr.subscribe(data=>{
      this.users=data;
    })
  }

  editUser(id:any){
    this.apiService.editDelivered(id)
  }
  updateOrder(user:any){
    this.apiService.selectUser(user);
  }
  sort(field:string){
    this.unSortedArr=[...this.users]
    if(field!=='price'){
      this.users.sort((a,b)=>{
        return a[field].localeCompare(b[field])
      })
      console.log(this.users)
    }
    else{
      this.users.sort((a,b)=>{
        const a1=a.price*a.quantity
        const b1= b.price*b.quantity
        return b1-a1
      })
    }
  }
  unSort(){
    this.users=[...this.unSortedArr]
    
  }

}
