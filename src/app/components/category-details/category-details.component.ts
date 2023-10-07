import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  constructor(private _ApiDataService:ApiDataService ,private _ActivatedRoute:ActivatedRoute){}
  categoryDetails:any = null;
  subCategoies:any[] = [];
  categoryId:any;
  ngOnInit(): void {
    window.scrollTo(0,0)
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.categoryId = params.get('id')
      }
    })
    this._ApiDataService.getCategoryById(this.categoryId).subscribe({
      next:(response)=>{
        this.categoryDetails = response.data

      }
    })
    this._ApiDataService.getSubCategories(this.categoryId).subscribe({
      next:(response)=>{
        this.subCategoies = response.data
      }
    })

  }
}
