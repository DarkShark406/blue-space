import { Component } from '@angular/core';
import { Faq3Service } from 'src/app/service/faq3.service';

@Component({
  selector: 'app-faq3',
  templateUrl: './faq3.component.html',
  styleUrls: ['./faq3.component.css']
})
export class Faq3Component {
  faq3: any
  constructor(private _service: Faq3Service) {
    this._service.getfaq3().subscribe({
      next: (data) => { this.faq3 = data }
    })
  }
}
