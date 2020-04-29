import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'rosnycadet',
    loadChildren: () => import('./pages/rosnycadet/rosnycadet.module').then( m => m.RosnycadetPageModule)
  },
  {
    path: 'article/:id',
    loadChildren: () => import('./pages/article/article.module').then( m => m.ArticlePageModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./pages/forms/forms.module').then( m => m.FormsPageModule)
  },
  {
    path: 'family',
    loadChildren: () => import('./pages/rosnycadet/family/family.module').then( m => m.FamilyPageModule)
  },
  {
    path: 'journey',
    loadChildren: () => import('./pages/rosnycadet/journey/journey.module').then( m => m.JourneyPageModule)
  },
  {
    path: 'speeches',
    loadChildren: () => import('./pages/rosnycadet/speeches/speeches.module').then( m => m.SpeechesPageModule)
  },
  {
    path: 'vision',
    loadChildren: () => import('./pages/rosnycadet/vision/vision.module').then( m => m.VisionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
