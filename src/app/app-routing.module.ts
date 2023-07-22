import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupsListPageComponent} from "./groups-list-page/groups-list-page.component";
import {GroupPageComponent} from "./group-page/group-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";
import {CreateGroupPageComponent} from "./create-group-page/create-group-page.component";
import {AuthService} from "./auth.service";

const routes: Routes = [
  {
    path: 'groups',
    component: GroupsListPageComponent,
    canActivate: [
      () => inject(AuthService).canAccess(true, "/sign-in"),
    ]
  },
  {
    path: 'groups/:id',
    component: GroupPageComponent,
    canActivate: [
      () => inject(AuthService).canAccess(true, "/sign-in"),
    ]
  },
  {
    path: 'sign-in',
    component: SignInPageComponent,
  },
  {
    path: 'create-group',
    component: CreateGroupPageComponent,
    canActivate: [
      () => inject(AuthService).canAccess(true, "/sign-in"),
    ]
  },
  // {
  //   path: '',
  //   redirectTo: "/groups",
  //   pathMatch: 'full',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
