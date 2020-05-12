import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
    if (confirm("Are you sure you want to disactive user?")) {
      var index = this.users.indexOf(user)
      this._userService.deleteUser(user.userId)
        .subscribe(null,
          err => {
            alert("Could not delete the user.");
          });
    }
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
