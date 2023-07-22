import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth, } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  public login(email: string, password: string) {
    return new Observable<UserCredential|boolean>((subscriber) => {
      this.auth.signInWithEmailAndPassword(email, password).then((user) => {
        subscriber.next(true);
        this.userData = user;
        return this.router.navigateByUrl('/groups');
      }).catch(e => {
        subscriber.next(false);
        return this.router.navigateByUrl('/sign-in')
      })
    });
  }

  public signOut() {
    this.auth.signOut().then(() => {
      return this.router.navigateByUrl('/sign-in')
    })
  }

  public canAccess(userIsLoggedIn: boolean, redirectPath: string) {
    this.auth.authState.pipe(map(user => {
      if(!!user === userIsLoggedIn) {
        return true;
      }

      this.router.parseUrl(redirectPath);
      return false;
    }));
  }
}
