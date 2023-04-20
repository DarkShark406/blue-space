import { Component, Input } from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css'],
})
export class StarsRatingComponent {
  @Input() rating!: number;
  @Input() maxRating!: number;
  @Input() isReadOnly!: boolean;
}
