import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public currentUser: string;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    firebase.auth().onAuthStateChanged(async (user) => {
      if (await user) {
        return this.currentUser = user.uid;
      }
      console.log(this.currentUser);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(e) {
    this.router.navigateByUrl(e);
  }
}
