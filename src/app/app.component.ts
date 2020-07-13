import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled';
  Open = false;
  closeNav() {
    this.Open = false;
  }
  openNav(){
    this.Open = true;
  }
}
