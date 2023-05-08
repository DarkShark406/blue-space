import { Component } from '@angular/core';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq-return',
  templateUrl: './faq-return.component.html',
  styleUrls: ['./faq-return.component.css'],
})
export class FAQReturnComponent {
  faq2: any;
  constructor(private FAQService: FAQService) {
    this.FAQService.getfaq2().subscribe({
      next: (data) => {
        this.faq2 = data;
      },
    });
  }
}
