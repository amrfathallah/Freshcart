import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _Router:Router , private _CartService:CartService){}

  cartCount:number = 0

  ngOnInit(): void {
     this._CartService.cartNumber.subscribe({
      next:(response)=>{
        this.cartCount = response
      }
     })

     this._CartService.getCart().subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{

      }
     })
  }

  signOut():void{
    localStorage.removeItem("_token")
    this._Router.navigate(['/login'])
  }
}
