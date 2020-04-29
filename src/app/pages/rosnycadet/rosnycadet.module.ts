import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RosnycadetPageRoutingModule } from './rosnycadet-routing.module';

import { RosnycadetPage } from './rosnycadet.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    RosnycadetPageRoutingModule
  ],
  declarations: [RosnycadetPage]
})
export class RosnycadetPageModule {}
