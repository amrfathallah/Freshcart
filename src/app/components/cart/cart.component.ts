import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){}

  cartData:any = null

  ngOnInit(): void {

    window.scrollTo(0,0)
      this._CartService.getCart().subscribe({
        next:(response)=>{
          if(response.data.products.length == 0){
            this.cartData = null
          }else{

            this.cartData = response.data;
            console.log(response.data);
          }
        },
        error:(err)=>{
          console.log(err);
          this.cartData = null

        }
      })
  }
    removeCartItem(id:string):void{
      this._CartService.removeCartItem(id).subscribe({
        next:(response)=>{
          this._CartService.cartNumber.next(response.numOfCartItems)
          if(response.data.products.length == 0){
            this.cartData = null
          }else{

            this.cartData = response.data;


          }


        }
      })
    }

    clearAllItems():void{
      this._CartService.clearCart().subscribe({
        next:(response)=>{
          this._CartService.cartNumber.next(0)
          console.log(response);
          this.cartData = null


        }
      })
    }

    changeCount(count:number , id:string):void{

      if(count >= 1)
      this._CartService.changeCount(id , count).subscribe({
        next:(response)=>{
            this.cartData = response.data
        }
      })
    }

}
