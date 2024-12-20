import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

import { error } from 'console';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users:any[] = []
  loader = true

  constructor(private productService:ProductService){}


ngOnInit(){
  this.loadUsers()
}


loadUsers(){
  this.loader = true
  this.productService.fetchUser().subscribe({
    next: (userData) =>{

      this.users = userData
      this.loader = false
      

    },error:(error)=>{
      console.log(error);
      
    }
  })
}
}
