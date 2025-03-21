import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  title: string ='';
  content: string ='';
  author: string ='';
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  post: Post = {
    title: '',
    content: '',
    author: '',
    imageUrl: '', //this.imageUrl,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  nombre: string = ''; // Definir la propiedad

  constructor(private blogService: BlogService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private routes: Router,
    private location: Location
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("Imagen seleccionada :", this.selectedFile);




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

  async createPost(title: string, content: string, author: string) {
    if (!this.imageUrl) {
      alert('Por favor, sube una imagen');
      return;
    }

    const post: Post = {
      title,
      content,
      author,
      imageUrl: this.imageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log("DaTo a Guardar",post);

    await this.blogService.createPost(post);
    alert('Post creado correctamente');
    this.routes.navigate(['/posts'])

  }


  async onSubmit(): Promise<void> {
    this.createPost(this.title, this.content, this.author)
    //await this.blogService.createPost(this.post);
    alert('Publicación creada exitosamente!');
  }

}
