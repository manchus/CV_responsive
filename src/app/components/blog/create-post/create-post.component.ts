import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  post: Post = {
    title: '',
    content: '',
    author: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  nombre: string = ''; // Definir la propiedad

  constructor(private blogService: BlogService) {}

  async onSubmit(): Promise<void> {
    await this.blogService.createPost(this.post);
    alert('Publicación creada exitosamente!');
  }
}
