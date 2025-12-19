import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  returnUrl = '';

  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
