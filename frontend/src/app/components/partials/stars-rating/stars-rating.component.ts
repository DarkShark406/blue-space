import { Component, Input } from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css'],
})
export class StarsRatingComponent {
  @Input() rating = 0;
  @Input() maxRating = 5;
  stars: { value: number }[] = [];

  ngOnInit() {
    this.stars = Array.from({ length: this.maxRating }, (_, i) => ({
      value: i + 1,
    }));
  }
}
