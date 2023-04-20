import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private _snack: MatSnackBar) {}
  ngOnInit() {
    // if (navigator.onLine) {
    //   this._snack.open('Hello', 'ok', { duration: 5000 });
    // }
    addEventListener('online', (e) => {
      this._snack.open('You are now Online', 'OK', {
        duration: 3000000,
        panelClass: 'online-green',
      });
    });
    addEventListener('offline', (e) => {
      this._snack.open('Please check your internet connection', 'OK', {
        duration: 5000000,
      });
    });
  }
}
