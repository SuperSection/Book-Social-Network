import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AuthenticationRequest,
  AuthenticationResponse,
} from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.errorMsg = [];
    this.authService
      .authenticate({
        body: this.authRequest,
      })
      .subscribe({
        next: (res: AuthenticationResponse): void => {
          this.tokenService.token = res.token as string;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.error);
          }
        },
      });
  }

}