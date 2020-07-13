import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-id',
  templateUrl: './show-id.component.html',
  styleUrls: ['./show-id.component.css']
})
export class ShowIDComponent implements OnInit {
  ID = sessionStorage.getItem('iddoct');
  constructor() { }

  ngOnInit(): void {
  }

}
