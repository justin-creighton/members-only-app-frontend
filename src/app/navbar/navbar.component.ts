import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    public authService: AuthService,
    public auth: AngularFireAuth
  ) {
  }

  onClickSignOut() {
    this.authService.signOut();
  }
}
