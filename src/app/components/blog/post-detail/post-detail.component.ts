import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyAIService } from '../../../services/my-ai.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;

  mensaje = 'Hola Como estas?';
  response = '';
  isLoading = false;
  error: string | null = null;
  tmpdate: Date = new Date();
  likes = 0;
  dislikes = 0;
  optEnable = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private myAIService: MyAIService
  ) {}

  private id = '';
  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.post = await this.blogService.getPostById(id);
      this.likes = this.post?.likes ? this.post?.likes : 0;
      this.dislikes = this.post?.dislikes ? this.post?.dislikes : 0;
    }
  }

  async likePost() {
    if (this.optEnable) {
      await this.blogService.likePost(this.id);
      this.likes++;
      this.optEnable = !this.optEnable;
    }
  }

  async dislikePost() {
    if (this.optEnable) {
      await this.blogService.disLikePost(this.id);
      this.dislikes++;
      this.optEnable = !this.optEnable;
    }
  }

  obtenerRespuesta() {
    this.isLoading = true;
    this.error = null;
    const data = {
      text: 'Este es un texto de ejemplo para analizar.',
    };

    this.myAIService.analyzeData(data).subscribe(
      (result) => {
        this.response = result;
        this.isLoading = false;
        console.log('Respuesta de DeepSeek:', result);
      },
      (error) => {
        console.error('Error al llamar a la API de DeepSeek:', error);
        this.isLoading = false;
      }
    );
  }
}
