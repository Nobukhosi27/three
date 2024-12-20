import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  userProduct: any ;
  
    
   constructor(private productService:ProductService, private route:ActivatedRoute){
   }

   ngOnInit(): void{
    this.route.params.subscribe(params =>{
      this.id = +params['id']
      this.loadUserProduct()
    })
   }
   loadUserProduct(): void{
    this.productService.getUserProduct(this.id).subscribe({
      next: (data)=>{
        this.userProduct= data
        console.log(this.userProduct)
        
  
      },error: (error)=>{
        console.log(error);
        
      }
    })
    
   }
  }
  

