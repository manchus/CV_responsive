import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CheckboxControlValueAccessor, CheckboxRequiredValidator, FormsModule } from '@angular/forms';
import { NgIf, Location } from '@angular/common';
import { RouterLink, ActivatedRoute, Routes, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { StorageService } from '../../../services/storage.service';
import { Post } from '../../../models/post.model';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  title: string = '';
  content: string = '';
  isHtml: boolean = false;
  author: string = '';
  categories: string[] = [];
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  aHtml: boolean = false;
  myCheck= '';

  post: Post = {
    title: '',
    content: '',
    isHtml: false,
    author: '',
    imageUrl: '', //this.imageUrl,
    categories: [],
    likes: 0,
    dislikes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),

  };

  nombre: string = ''; // Definir la propiedad

  constructor(
    private blogService: BlogService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private routes: Router,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Imagen seleccionada :', this.selectedFile);
  }

  uploadImage() {
    if (this.selectedFile) {
      this.storageService.uploadImage(this.selectedFile).subscribe(
        //console.log('Respuesta del backend:', response);
        (response: string) => {
          console.log('Respuesta del backend:', response); // Verifica la respuesta

          this.imageUrl = response; // Asigna la URL de la imagen
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    } else {
      alert('Por favor, selecciona un archivo.');
    }
  }

  async createPost(
    title: string,
    author: string,
    categories: string[]
  ) {
    if (!this.imageUrl) {
      alert('Please, add an image');
      return;
    }
    try {
      const post: Post = {
        title,
        content: this.content,
        author,
        imageUrl: this.imageUrl,
        categories,
        isHtml: this.isHtml,
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
    this.createPost(this.title, this.author, this.categories);
    //await this.blogService.createPost(this.post);
    alert('Publicación creada exitosamente!');
  }

  is_Html(){
    this.isHtml = !this.isHtml;
    console.log("Valor Select :",  this.isHtml)
  }




}
