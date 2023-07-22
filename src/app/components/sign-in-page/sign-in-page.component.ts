import { Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnDestroy {
  emailValue: string = '';
  passwordValue: string = '';
  subscription: any;

  constructor(private router: Router, public authService: AuthService) {
  }

  onClickSignIn(): void {
    this.subscription = this.authService.login(this.emailValue, this.passwordValue).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
