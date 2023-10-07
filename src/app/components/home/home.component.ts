import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/cart.service';
import { categories, product } from 'src/app/data-interface';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(
    private _ApiDataService:ApiDataService , private _CartService:CartService ,
    private _ToastrService:ToastrService , private _WishlistService:WishlistService
    ){}
    isAddedToWishlist: { [productId: string]: boolean } = {};
    wishlist:any[] = []
  productsData:product[] = []
  categories:categories[] = []
  ngOnInit(): void {

    window.scrollTo(0,0)
    // display products

      this._ApiDataService.getProducts().subscribe({
        next:(response)=>{
          this.productsData = response.data
        }
      })

  // display Categories
      this._ApiDataService.getCategories().subscribe({
        next:(response)=>{
          this.categories =  response.data;
        }
      })


  //  stay wishlist icon changed
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


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplaySpeed:500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  maincustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplaySpeed:500,
    items:1,
    nav: true
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
