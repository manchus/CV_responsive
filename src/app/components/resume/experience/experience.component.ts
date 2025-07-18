import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  @Input()  detailsExperience: any = [];
  detailsExperiences: any = [];
  @Input()  position: string = '';

  ngOnInit() {
    this.service.getDetailsExperience( this.detailsExperience ).subscribe((res) => (this.detailsExperiences = res));
  }
  constructor(
    private service: SharedService
  ) {}

}
