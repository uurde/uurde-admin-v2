import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  user = new UserModel();
  usernameAlert: string = "Please fill username";
  passwordAlert: string = "Please fill password";
  loginAlert: string;
  loginError: boolean = false;
  returnUrl: string;
  
  constructor(private _route: ActivatedRoute, private _authenticationservice: UserService, private _router: Router) { }

  ngOnInit(): void {
    this._authenticationservice.logout();
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/'
  }

  login() {
    this._authenticationservice.login(this.user)
      .pipe(first())
      .subscribe(
        res => {
          this._router.navigate([this.returnUrl]);
        },
        err => {
          return err;
        }
      );

  }
}
