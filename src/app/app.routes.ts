import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PostListComponent } from './components/blog/post-list/post-list.component';
import { PostDetailComponent } from './components/blog/post-detail/post-detail.component';
import { CreatePostComponent } from './components/blog/create-post/create-post.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'list', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'create', component: CreatePostComponent }
];
