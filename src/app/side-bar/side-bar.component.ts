import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() Open = false;
  ItsDocotr = false;
  constructor() {}

  ngOnInit(): void {
    if (sessionStorage.getItem('usertype') === 'Doctor')
    {
      this.ItsDocotr = true;
    }
  }

}
