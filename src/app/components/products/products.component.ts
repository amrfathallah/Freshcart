import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { product } from 'src/app/data-interface';
import { ApiDataService } from 'src/app/services/api-data.service';
import { WishlistService } from 'src/app/wishlist.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private _ApiDataService:ApiDataService , private _CartService:CartService ,
     private _ToastrService:ToastrService , private _WishlistService:WishlistService){}

  productsData:product[] = []
  isAddedToWishlist: { [productId: string]: boolean } = {};
    wishlist:any[] = []

  ngOnInit(): void {
    this._ApiDataService.getProducts().subscribe({
      next:(response)=>{
        this.productsData = response.data
      }
    })
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
       for (let i = 0; i < response.data.length; i++) {
        this.wishlist.push(response.data[i])
        this.isAddedToWishlist[response.data[i]._id] = true;
       }
      }
    })


    for (let i = 0; i < this.wishlist.length; i++) {
      this.isAddedToWishlist[i] = true;

    }
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

  addToWishList(id:string):void{
    this._WishlistService.setWishList(id).subscribe({
      next:(response)=>{
        console.log(response);

        this._ToastrService.success(response.message)
        this.isAddedToWishlist[id] = true;

      }
    })
  }
  removeFromWishlist(id:string):void{
    this._WishlistService.removeFromWishlist(id).subscribe({
      next:(response)=>{
        console.log(response);

        this._ToastrService.success(response.message)
        this.isAddedToWishlist[id] = false;
      }
    })
  }


}
