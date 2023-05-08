import { Component } from '@angular/core';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq-more',
  templateUrl: './faq-more.component.html',
  styleUrls: ['./faq-more.component.css'],
})
export class FAQMoreComponent {
  faq4: any;
  faq41: any;
  constructor(private FAQService: FAQService) {
    this.FAQService.getfaq4().subscribe({
      next: (data) => {
        this.faq4 = data;
      },
    });

    this.FAQService.getfaq41().subscribe({
      next: (data) => {
        this.faq41 = data;
      },
    });
  }
}
