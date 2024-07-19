import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/services';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule, FormsModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  message: string = '';
  isOkay: boolean = false;
  submitted: boolean = false;

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  confirmAccount(token: string) {
    this.authService
      .confirm({
        token,
      })
      .subscribe({
        next: () => {
          this.message =
            'Your account has been successfully activated.\nNow you can proceed to login.';
          this.submitted = true;
          this.isOkay = true;
        },
        error: (err) => {
          this.message = 'Token has been expired or invalid';
          this.submitted = true;
          this.isOkay = false;
        },
      });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}