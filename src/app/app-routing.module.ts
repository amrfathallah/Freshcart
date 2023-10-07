import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './auth.guard';
import { signoutGuard } from './signout.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [

  {path:'',component:BlankLayoutComponent, children:[
    {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home', canActivate:[authGuard] , component:HomeComponent},
  {path:'cart' ,canActivate:[authGuard] , component:CartComponent},
  {path:'products' ,canActivate:[authGuard] , component:ProductsComponent},
  {path:'wishlist' ,canActivate:[authGuard] , component:WishlistComponent},
  {path:'allorders' ,canActivate:[authGuard] , component:AllordersComponent},
  {path:'payment/:id' ,canActivate:[authGuard] , component:PaymentComponent},
  {path:'details/:id', canActivate:[authGuard] , component:ProductDetailsComponent},
  {path:'categories' ,canActivate:[authGuard] , component:CategoriesComponent},
  {path:'categories/:id' ,canActivate:[authGuard] , component:CategoryDetailsComponent},
  {path:'brands' ,canActivate:[authGuard] , component:BrandsComponent},
  {path:'brands/:id' ,canActivate:[authGuard] , component:BrandDetailsComponent},
  {path:'forgotpassowrd' , canActivate:[authGuard] ,component:ForgotPasswordComponent}
  ]},
  {path:'' , component:AuthLayoutComponent ,children:[
    {path:'login' ,canActivate:[signoutGuard] ,component:LoginComponent},
    {path:'register' , canActivate:[signoutGuard] ,component:RegisterComponent},
    {path:'forgotPassword' , canActivate:[signoutGuard] ,component:ForgotPasswordComponent}
  ]},
  {path:'**' , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
