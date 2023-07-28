import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { CreateGroupPageComponent } from './components/create-group-page/create-group-page.component';
import { GroupsListPageComponent } from './components/groups-list-page/groups-list-page.component';
import { GroupPageComponent } from './components/group-page/group-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { MyGroupsListComponent } from './components/my-groups-list/my-groups-list.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import {firebaseConfig} from './configs/firebase-config';

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
    HttpClientModule,
    AngularFirestoreModule,
    provideFirebaseApp(
      () => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore(),
    ),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: firebaseConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
