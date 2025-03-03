import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../models/post.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postsTmp: Post[] = [];

  constructor(private blogService: BlogService) {}

  async ngOnInit(): Promise<void> {
    this.posts = await this.blogService.getPosts();
    this.posts = this.posts.map((item) => {
      item.createdAt =(item.createdAt as unknown as Timestamp).toDate();
      return item;
      })
}
}
