import { Component } from '@angular/core';
// import { AboutUsService } from '../about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  aboutus: any;

  // constructor(private _cservice: AboutUsService){
  //   this._cservice.getAboutUs().subscribe({
  //     next:(data)=>{this.aboutus=data}
  //   })
  // }
}
