import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ServicesService } from "../../../services.service";
import { validate } from "./validator";

import { ToasterConfig } from "angular2-toaster";
import "style-loader!angular2-toaster/toaster.css";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService
} from "@nebular/theme";
import { combineLatest } from "rxjs";

@Component({
  selector: "ngx-tabs",
  styleUrls: ["./register.component.scss"],
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  user: any;
  config: ToasterConfig;
  status: NbComponentStatus = "primary";
  alert: any = ``;
  constructor(
    private router: Router,
    private auth: ServicesService,
    private toastrService: NbToastrService
  ) {
    this.initializeUser();
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,

      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, titleContent, config);
  }

  initializeUser() {
    this.user = {
      username: ``,
      password: ``,
      email: ``,
      phone: ``,
    };
  }
  register_user(user: any) {
    console.log(user);
    let valid = validate(user);
    if (valid.status) {
      this.auth.register_user(user).subscribe(() => {
        this.showToast(this.status, "User Registered Successfully", ``);
        this.initializeUser();
         this.router.navigate(['/pages/users/login']);
      });
    } else {
      this.showToast(this.status, "user already exists", ``);
    }
  }
}
