import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { environment } from './environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { CreateGroupPageComponent } from './create-group-page/create-group-page.component';
import { GroupsListPageComponent } from './groups-list-page/groups-list-page.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { MyGroupsListComponent } from './my-groups-list/my-groups-list.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule, FIREBASE_OPTIONS} from "@angular/fire/compat";
import {provideFirebaseApp, initializeApp} from "@angular/fire/app";
import { provideAuth, getAuth } from '@angular/fire/auth';
import {provideFirestore, getFirestore} from "@angular/fire/firestore";

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    CreateGroupPageComponent,
    GroupsListPageComponent,
    GroupPageComponent,
    NavbarComponent,
    GroupsListComponent,
    MyGroupsListComponent,
    MessagesListComponent,
    RequestsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFirestoreModule,
    provideFirebaseApp(
      () => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore(),
    ),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
