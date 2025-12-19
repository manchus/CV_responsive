import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyAIService } from '../../../services/my-ai.service';
//import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class PostDetailComponent implements OnInit {
  post: Post | null = null;

  response = '';
  isLoading = false;
  tmp = '';
  summary: SafeHtml  ='';
  error: string | null = null;
  tmpdate: Date = new Date();
  likes = 0;
  dislikes = 0;
  optEnable = true;

  translatedContent: string = '';
  isTranslating: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private myAIService: MyAIService,
    private sanitizer: DomSanitizer,
   // private translationService: TranslationService
  ) {}

  private id = '';
  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.post = await this.blogService.getPostById(id);
      this.likes = this.post?.likes ? this.post?.likes : 0;
      this.tmp = this.post?.summary ?? '';
      this.summary= this.post?.isHtml ? this.sanitizer.bypassSecurityTrustHtml(this.tmp) : this.tmp;
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
      },
      (error) => {
        console.error('Error al llamar a la API de DeepSeek:', error);
        this.isLoading = false;
      }
    );
  }

  searchByCategory(cat:  string){
    this.router.navigate(['/posts'], { queryParams: { category: cat } });
  }

  /*
  async translateTo(language: string) {
    this.isTranslating = true;
    try {
      this.translatedContent = await this.translationService.translatePost(
        'POST_ID_HERE', // Pass your post ID
        language
      );
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      this.isTranslating = false;
    }
  } */
}

