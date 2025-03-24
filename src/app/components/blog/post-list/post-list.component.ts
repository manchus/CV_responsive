import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../models/post.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-post-list',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterLink, FormsModule],
=======
  imports: [CommonModule, RouterLink],
>>>>>>> e78c19d89bbdda8da7ab4257d4fb70045b4b10f5
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
<<<<<<< HEAD
  filteredPosts: Post[] = []; // Lista filtrada de posts
  searchTerm: string = '';
=======
  postsTmp: Post[] = [];
>>>>>>> e78c19d89bbdda8da7ab4257d4fb70045b4b10f5

  constructor(private blogService: BlogService) {}

  async ngOnInit(): Promise<void> {
    this.loadPosts();
  }

  async loadPosts() {
    this.posts = await this.blogService.getPosts();
    this.posts = this.posts.map((item) => {
<<<<<<< HEAD
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
          post.content.toLowerCase().includes(term) ||
          post.categories.some((category) =>
            category.toLowerCase().includes(term)
          )
      );
    }
  }

  likePost(id : string | undefined){

  }

  dislikePost(id : string | undefined ){

  }
=======
      item.createdAt =(item.createdAt as unknown as Timestamp).toDate();
      return item;
      })
}
>>>>>>> e78c19d89bbdda8da7ab4257d4fb70045b4b10f5
}
