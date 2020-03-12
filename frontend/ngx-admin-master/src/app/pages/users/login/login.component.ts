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
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html"
})
export class LoginComponent {
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
      password: ``,
      email: ``,
    };
  }
  login(user: any) {
    console.log(user);
    let valid = validate(user);
    if (valid.status) {
      this.auth.login(user).subscribe(() => {
        this.showToast(this.status, "User Logged in Successfully", ``);
        this.initializeUser();
        this.router.navigate(['/pages/users/view']);
      });
    } else {
      this.alert = valid.msg;
    }
  }
}
