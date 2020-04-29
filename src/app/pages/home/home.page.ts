import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { WpApiService } from 'src/app/services/wp-api.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  showToolbar = false;

  posts = [];
  page = 1;
  count = null;

  constructor(
    private wp: WpApiService,
    public loadingCtlr: LoadingController,
    private router: Router
  ) {

  }

  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 4000
    });
    await loading.present();

    this.wp.getPosts().subscribe(async res => {
      this.count = this.wp.totalPosts;
      this.posts = res;

      await loading.dismiss();
    });
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

  async loadMorePosts(event) {
    this.page++;

    this.wp.getPosts(this.page).subscribe(res => {
      this.posts = [...this.posts, ...res];

      event.target.complete();

      if (this.page == this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }

  openPage(e) {
    this.router.navigateByUrl(e);
  }

}
