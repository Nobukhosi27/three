import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { error } from 'console';
import{RouterLink} from '@angular/router'


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products:any[] = []
  loader = true

  userNames:{[userId:number]: {username:string}}  ={}

  
  constructor(private productService:ProductService){}


  ngOnInit(){
    this.loadProducts()
  }
  
  loadProducts(){
    this.loader = true
    this.productService.fetchProduct().subscribe({
      next: (productData) =>{

        this.products = productData
        this.loadUserNames()
        this.loader = false
  
      },error:(error)=>{
        console.log(error);
        
      }
    })
  
  }

  
    loadUserNames(){
      const userIds= [...new Set(this.products.map(product => product.id))]
      userIds.forEach(id=>{
        this.productService.fetchUserById(id).subscribe({
          next:(user)=> {
            this.userNames[id] ={
              username:user.username
            }
    
          }, error: (error)=>{
            console.log('error fetching user data');
            
          }
        })
      })
    }
  }

