import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _ApiDataService:ApiDataService){}

  brands:any = null
  ngOnInit(): void {
    window.scrollTo(0,0)
      this._ApiDataService.getBrands().subscribe({
        next:(response)=>{
         this.brands =  response.data;

        }
      })
  }
}
