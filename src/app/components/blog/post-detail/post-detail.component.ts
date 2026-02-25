import { Component, OnInit, ViewEncapsulation, DestroyRef, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../services/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class PostDetailComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  post: Post | null = null;

  response = '';
  isLoading = false;
  tmp = '';
  summary: SafeHtml  ='';
  summaryTranslated: SafeHtml  ='';
  lang = '';
  error: string | null = null;
  tmpdate: Date = new Date();
  likes = 0;
  dislikes = 0;
  optEnable = true;
  currentLang: string = this.translocoService.getActiveLang();

  translatedSummary: string = '';
  translatedTitle: string = '';
  translatedLang: string = '';
  isTranslating: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private readonly translocoService: TranslocoService,
    private translationService: TranslationService
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
      this.lang = this.post?.lang ?? '';
    }

    this.translocoService.langChanges$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(async lang => {
      this.currentLang = lang;
      if (this.post && this.lang != this.currentLang) {
        await this.translateTo();
      }
    });
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


  searchByCategory(cat:  string){
    this.router.navigate(['/posts'], { queryParams: { category: cat } });
  }


async translateTo() {
  if (!this.tmp) return;
  this.isTranslating = true;

  // Convert Observable to Promise for use with 'await'
  try {
    const result = await this.translationService.translateText(this.tmp, this.currentLang).toPromise();
    this.translatedTitle = await this.translationService.translateText(this.post?.title ?? '', this.currentLang).toPromise() || '';

    console.log("Translation result:", result);
    console.log("Translation Lang:", this.currentLang);
    console.log("Translation Title:", this.translatedTitle);

    if (result) {
      this.translatedSummary = result;
      // If the content is HTML, sanitize it like you do in ngOnInit
      this.summaryTranslated = this.post?.isHtml
        ? this.sanitizer.bypassSecurityTrustHtml(this.translatedSummary)
        : this.translatedSummary;
        this.translatedLang = this.currentLang;
    }
  } catch (error) {
    console.error('Translation failed:', error);
  } finally {
    this.isTranslating = false;
  }
}

}

