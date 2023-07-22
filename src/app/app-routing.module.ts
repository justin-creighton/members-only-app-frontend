import { inject, NgModule } from '@angular/core'; // MODULE IMPORTS
import { RouterModule, Routes } from '@angular/router';
import { GroupsListPageComponent } from "./components/groups-list-page/groups-list-page.component"; // CUSTOM COMPONENT IMPORTS
import { GroupPageComponent } from "./components/group-page/group-page.component";
import { SignInPageComponent } from "./components/sign-in-page/sign-in-page.component";
import { CreateGroupPageComponent } from "./components/create-group-page/create-group-page.component";
import { AuthService } from "./services/auth-service/auth.service"; // SERVICES IMPORTS

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
