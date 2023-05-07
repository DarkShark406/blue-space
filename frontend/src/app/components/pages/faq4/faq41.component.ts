import { Component } from '@angular/core';
import { FAQ41Service } from '../faq41.service';

@Component({
  selector: 'app-faq41',
  templateUrl: './faq41.component.html',
  styleUrls: ['./faq41.component.css']
})
export class FAQ41Component {
  faq41:any
  constructor(private _cservice: FAQ41Service){
    this._cservice.getfaq41().subscribe({
      next:(data)=>{this.faq41=data}
    })
  }
}
