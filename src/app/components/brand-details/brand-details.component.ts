import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit {

  constructor(private _ApiDataService:ApiDataService , private _ActivatedRoute:ActivatedRoute){}
  BrandId:any;
  brandDetails:any = null;
  ngOnInit(): void {
    window.scrollTo(0,0)
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.BrandId = params.get('id')
        }
      })
      this._ApiDataService.getBrandsbyId(this.BrandId).subscribe({
        next:(response)=>{
           this.brandDetails = response.data
        }
      })
  }
}
