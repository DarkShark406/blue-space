import { Component } from '@angular/core';
import { Faq2Service } from 'src/app/service/faq2.service';

@Component({
  selector: 'app-faq2',
  templateUrl: './faq2.component.html',
  styleUrls: ['./faq2.component.css']
})
export class Faq2Component {
  faq2: any
  constructor(private _service: Faq2Service) {
    this._service.getfaq2().subscribe({
      next: (data) => { this.faq2 = data }
    })
  }
}
