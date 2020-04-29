import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

  constructor(
    private loadingCtlr: LoadingController,
    private menu: MenuController
  ) { }

  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 4000
    });
    await loading.present();
    await loading.dismiss();
    this.menu.close();
  }
}
