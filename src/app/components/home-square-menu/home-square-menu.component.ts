import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-square-menu',
  templateUrl: './home-square-menu.component.html',
  styleUrls: ['./home-square-menu.component.scss'],
})
export class HomeSquareMenuComponent implements OnInit {

  
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 3000,
    }
  };

  constructor(
    public router: Router
  ) { }

  ngOnInit() {}

  openPage(e) {
    this.router.navigateByUrl(e);
  }

}
