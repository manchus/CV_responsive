import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
//import { ResolverService } from './services/resolver.service';
import { ResumeComponent } from './components/resume/resume.component';
import { PostListComponent } from './components/blog/post-list/post-list.component';
import { PostDetailComponent } from './components/blog/post-detail/post-detail.component';
import { CreatePostComponent } from './components/blog/create-post/create-post.component';

const resolveLngActivate = () => {
  const lngActive = 'es'; // Aquí puedes obtener los datos que necesitas
  //return { lngActivate2: lngActive };
  return lngActive ;
};

export const routes: Routes = [
  { path: '', component: ResumeComponent, resolve:{ lngActivate2:resolveLngActivate} },
  { path: 'posts', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'create', component: CreatePostComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
