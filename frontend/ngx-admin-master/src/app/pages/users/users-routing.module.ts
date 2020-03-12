import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./users.component";
import { ViewComponent } from "./view/view.component";

import { RegisterComponent } from "./register/register.component";

import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "view",
        component: ViewComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
       {
        path: "login",
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

export const routedComponents = [UsersComponent, ViewComponent, RegisterComponent, LoginComponent];
