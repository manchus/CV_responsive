import { Component, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { StorageService } from '../../../services/storage.service';
import { Post,PostContentBlock } from '../../../models/post.model';
import { v4 as uuidv4 } from 'uuid';
import { lastValueFrom } from 'rxjs';

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

  constructor(
    private blogService: BlogService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private routes: Router,
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
        content: this.contentBlock,
        summary: this.summary,

        author:'',
        imageUrl: this.imageUrl,
        categories,
        isHtml: this.isHtml,
        lang:'en',
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

  addBlock() {
    console.log("Cambio: ", this.contentBlock);
  const block: PostContentBlock = {
    id: uuidv4(),
    type: this.newBlockType,
    data: this.defaultDataForType(this.newBlockType)
  };
  this.contentBlock.push(block);
}









defaultDataForType(type: PostContentBlock['type']) {
  switch (type) {
    case 'title': return '';
    case 'paragraph': return '';
    case 'image': return { url: '', caption: '' };
    case 'quote': return '';
    case 'code': return { language: 'ts', content: '' };
  }
}

removeBlock(index: number) {
  this.contentBlock.splice(index, 1);
}


trackById(index: number, block: PostContentBlock): string | number {
  return block.id ?? index;
}




 // si tu as uuid installé



}
