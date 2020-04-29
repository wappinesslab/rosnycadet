import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSliderTopComponent } from './home-slider-top/home-slider-top.component';
import { IonicModule } from '@ionic/angular';
import { HomeSquareMenuComponent } from './home-square-menu/home-square-menu.component';
import { RcPhotosSliderComponent } from './rc-photos-slider/rc-photos-slider.component';



@NgModule({
  declarations: [
    HomeSliderTopComponent,
    HomeSquareMenuComponent,
    RcPhotosSliderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HomeSliderTopComponent,
    HomeSquareMenuComponent,
    RcPhotosSliderComponent
  ]
})
export class SharedComponentsModule { }
