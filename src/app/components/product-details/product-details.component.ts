import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute , private _ApiDataService:ApiDataService , private _CartService:CartService , private _ToastrService:ToastrService){}
  productDetails:any = null
  productId:any;
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.productId  = params.get("id")
        }
      })
      this._ApiDataService.getProductById(this.productId).subscribe({
        next:(response)=>{
          this.productDetails = response.data
          // console.log(response.data);

        }
      })
  }


  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplaySpeed:500,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }


  addProduct(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
        console.log(response);
        this._ToastrService.success(response.message)
      }
    })
  }
}
