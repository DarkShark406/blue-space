import { Component } from '@angular/core';
import { FAQ4Service } from '../faq4.service';


@Component({
  selector: 'app-faq4',
  templateUrl: './faq4.component.html',
  styleUrls: ['./faq4.component.css']
})

export class FAQ4Component {
  faq4:any
  constructor(private _cservice: FAQ4Service){
    this._cservice.getfaq4().subscribe({
      next:(data)=>{this.faq4=data}
    })
  }
}
