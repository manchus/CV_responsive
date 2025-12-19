import { Component,  } from '@angular/core';
import { DomSanitizer,  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { StorageService } from '../../../services/storage.service';
import { Post, PostContentBlock } from '../../../models/post.model';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, NgIf, NgSwitch, NgFor, NgSwitchCase],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  title: string = '';
  summary: string = '';
  isHtml: boolean = false;
  author: string = '';
  categories: string[] = [];
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  contentBlock: PostContentBlock[] = [];
  newBlockType: PostContentBlock['type'] = 'paragraph';

  isDragging = false;
  showLoginModal = false;
  loginUsername = '';
  loginPassword = '';
  loginError = '';

  constructor(
    private blogService: BlogService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private routes: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadImage();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.selectedFile = event.dataTransfer.files[0];
      this.uploadImage();
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      this.storageService.uploadImage(this.selectedFile).subscribe(
        (response: string) => {
          this.imageUrl = response;
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    } else {
      alert('Por favor, selecciona un archivo.');
    }
  }

  async createPost(title: string, author: string, categories: string[]) {
    if (!this.imageUrl) {
      alert('Please, add an image');
      return;
    }
    try {
      const post: Post = {
        title,
        content: this.contentBlock,
        summary: this.summary,
        author: '',
        imageUrl: this.imageUrl,
        categories,
        isHtml: this.isHtml,
        lang: 'en',
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.blogService.createPost(post);
      this.routes.navigate(['/posts']);
    } catch (error) {
      console.error('Error publishing te post:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.authService.checkAuthStatus()) {
      this.showLoginModal = true;
      return;
    }
    this.createPost(this.title, this.author, this.categories);
  }

  onLoginSubmit() {
    if (this.authService.login(this.loginUsername, this.loginPassword)) {
      this.showLoginModal = false;
      this.createPost(this.title, this.author, this.categories);
    } else {
      this.loginError = 'Invalid credentials';
    }
  }

  quit() {
    this.authService.logout();
    this.routes.navigate(['/posts']);
  }

  addBlock() {
    const block: PostContentBlock = {
      id: uuidv4(),
      type: this.newBlockType,
      data: this.defaultDataForType(this.newBlockType),
    };
    this.contentBlock.push(block);
  }

  defaultDataForType(type: PostContentBlock['type']) {
    switch (type) {
      case 'title':
        return '';
      case 'paragraph':
        return '';
      case 'image':
        return { url: '', caption: '' };
      case 'quote':
        return '';
      case 'code':
        return { language: 'ts', content: '' };
    }
  }

  removeBlock(index: number) {
    this.contentBlock.splice(index, 1);
  }

  trackById(index: number, block: PostContentBlock): string | number {
    return block.id ?? index;
  }
}
