import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../models/post.model';
import { Timestamp } from '@angular/fire/firestore';
import { DestroyRef, inject } from '@angular/core';
import { TranslocoModule,TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [TranslocoModule,CommonModule, RouterLink, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchTerm: string = '';
  currentLang: string=this.translocoService.getActiveLang();
  private destroyRef = inject(DestroyRef);


    constructor(private blogService: BlogService, private readonly translocoService: TranslocoService, private route: ActivatedRoute) {
        this.translocoService.langChanges$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(lang => {
            this.currentLang = lang;

        });
      }

  async ngOnInit(): Promise<void> {
    this.loadPosts();
    this.route.queryParams.subscribe( params => {
      this.searchTerm = params['category'];
    });
  }

  async loadPosts() {
    this.posts = await this.blogService.getPosts();
    this.posts = this.posts.map((item) => {
      item.createdAt = (item.createdAt as unknown as Timestamp).toDate();
      return item;
    });
    this.filteredPosts = this.posts;
  }

  filterPosts() {
    if (!this.searchTerm) {
      this.filteredPosts = this.posts;
    } else {
      const term = this.searchTerm.toLowerCase();
      console.log('Termino de busqueda: ', term);
      this.filteredPosts = this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.summary.toLowerCase().includes(term) ||
          post.categories.some((category) =>
            category.toLowerCase().includes(term)
          )
      );
    }
  }

  searchCat(cat:  string){
    this.searchTerm = cat;
    console.log("Categoria Seleccionada : ", cat);
    const term = this.searchTerm.toLowerCase();
    console.log('Termino de busqueda: ', term);
    this.filteredPosts = this.posts.filter(
      (post) => post.title.toLowerCase().includes(term) ||
        post.categories.some((category) =>
          category.toLowerCase().includes(term)
        )
    );
  }

}
