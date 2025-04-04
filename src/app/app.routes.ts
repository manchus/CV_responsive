import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { PostListComponent } from './components/blog/post-list/post-list.component';
import { PostDetailComponent } from './components/blog/post-detail/post-detail.component';
import { CreatePostComponent } from './components/blog/create-post/create-post.component';


export const routes: Routes = [
  { path: 'resume', component: ResumeComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'create', component: CreatePostComponent },

  { path: '', redirectTo: 'resume', pathMatch: 'full' },
  { path: '**', redirectTo: 'resume' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
