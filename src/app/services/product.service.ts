import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'node:console';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private Producturl ='https://fakestoreapi.com/products'
private UserUrl ='https://fakestoreapi.com/users'

  constructor(private httpClient:HttpClient) { }

  fetchProduct():Observable<any>{
    return this.httpClient.get<any>(this.Producturl)
  }

  fetchUserById(id:number):Observable<any>{
    return this.httpClient.get<any>(this.UserUrl + '/' + id)
  }
  
  

  addProduct(productData:any):Observable<any>{
    return this.httpClient.post(this.Producturl  ,productData).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(()=>error)
      })
    )
  }

  updateProduct(id:number , updateProduct:any):Observable<any>{
    return this.httpClient.put<any>(this.Producturl + '/' + id, updateProduct);

  }
  deleteProduct(id:number ):Observable<any>{
    return this.httpClient.delete<any>(this.Producturl + '/' + id)

  }
 
getUserProduct(id:any):Observable<any>{
  return this.httpClient.get<any>(this.Producturl + '/' + id)
}
fetchUser():Observable<any>{
  return this.httpClient.get<any>(this.UserUrl)
}
}
