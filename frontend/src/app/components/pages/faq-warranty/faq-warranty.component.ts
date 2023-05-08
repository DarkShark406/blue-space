import { Component } from '@angular/core';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq-warranty',
  templateUrl: './faq-warranty.component.html',
  styleUrls: ['./faq-warranty.component.css'],
})
export class FAQWarrantyComponent {
  faq3: any;
  constructor(private FAQService: FAQService) {
    this.FAQService.getfaq3().subscribe({
      next: (data) => {
        this.faq3 = data;
      },
    });
  }
}
