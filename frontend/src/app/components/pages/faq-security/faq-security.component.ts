import { Component } from '@angular/core';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq-security',
  templateUrl: './faq-security.component.html',
  styleUrls: ['./faq-security.component.css'],
})
export class FAQSecurityComponent {
  faq1: any;

  constructor(private FAQService: FAQService) {
    this.FAQService.getfaq1().subscribe({
      next: (data) => {
        this.faq1 = data;
      },
    });
  }
}
