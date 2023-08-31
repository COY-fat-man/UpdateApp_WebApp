import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  visibleBarMenu = false;
  name = "";
  url = "../../../assets/images/user/user-info.png";
  constructor() { }

  ngOnInit() {
    
  }

  openBarMenu(): void {
    this.visibleBarMenu = true;
}

closeBarMenu(): void {
    this.visibleBarMenu = false;
}
}
