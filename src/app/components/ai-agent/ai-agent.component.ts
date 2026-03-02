import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyAIService } from '../../services/my-ai.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [TranslocoModule, CommonModule, FormsModule],
  templateUrl: './ai-agent.component.html',
  styleUrl: './ai-agent.component.css'
})
export class AiAgentComponent implements OnInit {
  private myAIService = inject(MyAIService);
  private transloco = inject(TranslocoService);

  isOpen = false;
  isLoading = false;
  messages: any[] = [{ text: "Hola, ¿en qué puedo ayudarte?", type: 'ai' }];
  query = '';

  ngOnInit() {
    this.myAIService.wakeupLocalAI('online').subscribe({
      next: (status) => console.log('AI Status:', status),
      error: (err) => console.error('AI Wakeup Error:', err)
    });
  }

  ask() {
    if (!this.query.trim()) return;
    const userMsg = this.query;
    this.messages.push({ text: userMsg, type: 'user' });
    this.query = '';
    this.isLoading = true;

    const currentLang = this.transloco.getActiveLang();
    this.myAIService.requestAI(userMsg, currentLang, 'tinyllama')
      .subscribe({
        next: (answer) => {
          this.messages.push({ text: answer, type: 'ai' });
          this.isLoading = false;
        },
        error: (error) => {
          this.messages.push({ text: 'Error al obtener respuesta del AI.', type: 'error' });
          this.isLoading = false;
        }
      });
  }
}
