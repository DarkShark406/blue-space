import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  expandList(idTitle: string) {
    document.getElementById(idTitle)?.classList.toggle('active');
  }
}
