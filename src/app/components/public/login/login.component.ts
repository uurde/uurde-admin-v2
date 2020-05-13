import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('succes', { static: false }) private succes: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;

  loginForm: FormGroup;
  user = new UserModel();
  usernameAlert: string = "Please fill username";
  passwordAlert: string = "Please fill password";
  loginAlert: string;
  loginError: boolean = false;
  returnUrl: string;

  constructor(private _route: ActivatedRoute, private _authenticationservice: UserService, private _router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this._authenticationservice.logout();
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/'
  }

  login() {
    this.spinner.show();
    this._authenticationservice.setUserLoggedIn(true);
    this._authenticationservice.login(this.user)
      .pipe(first())
      .subscribe(
        res => {
          this._router.navigate([this.returnUrl]);
        },
        err => {
          if (err.status == 404) {
            this.error.fire();
          }
        },
        () => {
          this.spinner.hide(),
            this.succes.fire()
        }
      );
  }
}
