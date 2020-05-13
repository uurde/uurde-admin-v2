import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @ViewChild('saved', { static: false }) private saved: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  title: string;
  user = new UserModel();
  userForm: FormGroup;
  path;

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService) {

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var id = +params["id"];
      this.title = id ? "Edit User" : "New User";
      if (!id)
        return;
      this._userService.getUser(id).subscribe(
        data => {
          this.user = data as any;
        },
        response => {
          if (response.status == 404) {
            this._router.navigate(['user']);
          }
        }
      );
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        let path = reader.result;
        //this.user.userPhotoPath = path;
      }
    }
  }

  save() {
    var result;
    if (this.user.userId == null)
      result = this._userService.insertUser(this.user);
    else
      result = this._userService.updateUser(this.user);

    result.subscribe(
      x => {
        this._router.navigate(['user']);
      },
      err => {
        this.error.fire();
      },
      () => {
        this.saved.fire();
      });
  }

  cancel() {
    this._router.navigate(['user']);
  }
}
