import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RosnycadetPage } from './rosnycadet.page';

const routes: Routes = [
  {
    path: '',
    component: RosnycadetPage
  },
  {
    path: 'family',
    loadChildren: () => import('./family/family.module').then( m => m.FamilyPageModule)
  },
  {
    path: 'journey',
    loadChildren: () => import('./journey/journey.module').then( m => m.JourneyPageModule)
  },
  {
    path: 'speeches',
    loadChildren: () => import('./speeches/speeches.module').then( m => m.SpeechesPageModule)
  },
  {
    path: 'vision',
    loadChildren: () => import('./vision/vision.module').then( m => m.VisionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RosnycadetPageRoutingModule {}
