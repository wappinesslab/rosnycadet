import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rc-photos-slider',
  templateUrl: './rc-photos-slider.component.html',
  styleUrls: ['./rc-photos-slider.component.scss'],
})
export class RcPhotosSliderComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 3000,
    }
  };

  constructor() { }

  ngOnInit() {}

}
