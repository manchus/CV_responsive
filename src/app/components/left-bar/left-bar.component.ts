import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule,TranslocoService,TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';

import { RouterLink } from '@angular/router';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [TranslocoModule, CommonModule, RouterLink],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent{
  private destroyRef = inject(DestroyRef);


  studies: any =[];
  currentLang: string=this.translocoService.getActiveLang();

  isAuthenticated = false;

  constructor(private readonly translocoService: TranslocoService,
    private service: SharedService, public authService: AuthService) {
      this.translocoService.langChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(lang => {
           this.service.getStudy("hv_"+this.currentLang).subscribe((res) => (this.studies = res));
      });

    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
    }

}
