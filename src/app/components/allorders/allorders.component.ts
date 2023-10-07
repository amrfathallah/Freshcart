import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

constructor( private _CartService:CartService , private _AuthService:AuthService){}
userId:string = ''
userOrders:any[] = [];

  ngOnInit(): void {
    window.scrollTo(0,0)
    this._AuthService.saveUser()
    this.userId = this._AuthService.userData.id
    console.log(this.userId);

      this._CartService.getAllOrders(this.userId).subscribe({
        next:(response)=>{
          this.userOrders =response;

          console.log(this.userOrders);


        }
      })
  }
}
