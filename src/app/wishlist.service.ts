import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }


  setWishList(proId:string):Observable<any>{
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,

    {

        productId: proId

    },


    )
  }
  getWishlist():Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/wishlist` ,



    )
  }
  removeFromWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,


    )
  }
}
