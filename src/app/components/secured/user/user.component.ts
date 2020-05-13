import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  users: any;
  user;
  pagedUsers = [];
  pageSize = 10;
  p: number = 1;

  constructor(private _userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.spinner.show();
    this._userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.pagedUsers = _.take(this.users, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  deleteUser(user) {
    this._userService.deleteUser(user.userId)
      .subscribe(null,
        err => {
          this.error.fire();
        },
        () => {
          this.deleted.fire();
        });
  }

  select(user) {
    this.user = user;
    this._userService.getUser(user.userId).subscribe(data => this.user = data, null);
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedUsers = _.take(_.rest(this.users, startIndex), this.pageSize);
  }

}
