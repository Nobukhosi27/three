import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

import { response } from 'express';
import { error } from 'console';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent  {


  title = ''
  price = ''
  description = ''
  category = ''
  image = ''

currentUserId:any

constructor(private authService:AuthService , private productService:ProductService){}

ngOnInit(){
  this.authService.CurrentUserP.subscribe(user=>{   
this.currentUserId = user.id




  })
}

  addProduct(){

const newProduct = {
  title : this.title ,
 price: this.price ,
  description : this.description ,
  category : this.category,
  image : this.image ,
  id : this.currentUserId
}

 this.productService.addProduct(newProduct).subscribe({
  next:response =>{
    console.log(response);
    
  }, error: error =>{
    console.log(error);
    
  }
 })
  

  }

}
