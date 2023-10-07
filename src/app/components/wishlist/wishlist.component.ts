import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
constructor(private _WishlistService:WishlistService , private _CartService:CartService , private _ToastrService:ToastrService){}
wishListData:any = null
ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        if(response.data.length == 0){
          this.wishListData = null
        }else{

          this.wishListData = response.data;
          console.log(response.data);
        }
      },
      error:(err)=>{
        console.log(err);
        this.wishListData = null

      }
    })
}
removeFromWishlist(id:string):void{
  this._WishlistService.removeFromWishlist(id).subscribe({
    next:(response)=>{
        if(response.data.length == 0){
          this.wishListData = null
        }else{
          let idToRemove = id;
    let filteredArray = this.wishListData.filter(function(obj:any) {
    return obj.id !== idToRemove;
      });
    this.wishListData = filteredArray
    console.log(response);
    this._ToastrService.success(response.message)
    }
    }
  })
}





addProduct(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this._CartService.cartNumber.next(response.numOfCartItems)
      console.log(this._CartService.cartNumber);

      this._ToastrService.success(response.message)

    }
  })
}


}
