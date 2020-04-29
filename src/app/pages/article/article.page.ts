import { Component, OnInit } from '@angular/core';
import { WpApiService } from 'src/app/services/wp-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  post: any;

  constructor(
    private wp: WpApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostDetails(id).subscribe(res => {
      this.post = res;
    })
  }

  openURL() {
    window.open(this.post.link, '_blank')
  }


}
