import { Component } from '@angular/core';
import { Faq1Service } from 'src/app/service/faq1.service';

@Component({
  selector: 'app-faq1',
  templateUrl: './faq1.component.html',
  styleUrls: ['./faq1.component.css']
})
export class Faq1Component {
  faq1: any
  constructor(private _service: Faq1Service) {
    this._service.getfaq1().subscribe({
      next: (data) => { this.faq1 = data }
    })
  }
}
