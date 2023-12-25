import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  @Input()  detailsExperience: any = [];
  detailsExperiences: any = [];

  ngOnInit() {
    this.service.getDetailsExperience( this.detailsExperience ).subscribe((res) => (this.detailsExperiences = res));
  }
  constructor(
    private service: SharedService
  ) {}

}
