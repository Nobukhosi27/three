import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { error } from 'node:console';
import { BehaviorSubject, catchError,  map,  Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoginUrl='https://fakestoreapi.com/auth/login'
  private userDetailsUrl ='https://fakestoreapi.com/users/1'
 

  private currentUserSubject = new BehaviorSubject<any>(null)

  constructor(private httpClient:HttpClient , @Inject(PLATFORM_ID) private platformId:Object) {
    if (isPlatformBrowser(this.platformId)){
      const storedUser= localStorage.getItem('currentUser');
      if (storedUser){
        this.currentUserSubject.next(JSON.parse(storedUser))
      }
    }
   }

  login(username:string , password:string):Observable<any>{
    return this.httpClient.post<{token:string}>(this.LoginUrl,{username,password}).pipe(
      switchMap((response) =>{
        const token =response.token
        this.saveToken(token);
        return this.getUserDetails(token);

      }),
      map((userData)=>{
        this.setCurrentUser(userData);
        this.currentUserSubject.next(userData);
      console.log('Login successful and user details fetched', userData);
      return userData;
      
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed' , error)
        return throwError(()=> error)
      })
      
    );
  
    
  }

  private getUserDetails(token:string):Observable<any>{
    return this.httpClient.get(this.userDetailsUrl).pipe( catchError((error: HttpErrorResponse) => {
      console.error('Login failed' , error)
      return throwError(()=> error)
    })
    
  );

  }

  private saveToken(token:string){
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem('authToken', token);
    }
    
  }

  private getToken(): string | null {
    if(isPlatformBrowser(this.platformId)){
      localStorage.getItem('authToken');
    }
    return null
  }
 private  setCurrentUser(user:any):void{
  if(isPlatformBrowser(this.platformId)){
    localStorage.setItem('currentUser' , JSON.stringify(user));
  }
 }

 
 logout(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('authToken')
      localStorage.removeItem('currentUser')
    }
    this.currentUserSubject.next(null)
  }
  
  isLoggedin(): boolean{
    return this.getToken() != null
  }

  get CurrentUserP():Observable<any>{
    return this.currentUserSubject.asObservable();
  }
  }

  



  
 