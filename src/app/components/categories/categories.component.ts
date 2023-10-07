import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ApiDataService:ApiDataService){}

  categories:any[] = []

  ngOnInit(): void {
    window.scrollTo(0,0)
    this._ApiDataService.getCategories().subscribe({
      next:(response)=>{
        this.categories =  response.data;
      }
    })
  }

}
