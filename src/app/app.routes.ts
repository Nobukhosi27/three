import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [

{path:'login', component:LoginComponent},
{path:'products', component:ProductComponent},
{path:'add-product', component:AddProductComponent},
{path:'user/:id', component:UserComponent},
{path:'product-details', component:ProductDetailsComponent},
{path: '**', redirectTo:'/login'}

];
