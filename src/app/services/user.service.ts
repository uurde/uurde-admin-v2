import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { HeaderConfig } from 'src/app/services/header.config';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {
    headerConfig = new HeaderConfig();

    user: UserModel;
    users: UserModel[];

    private _url = this.headerConfig.url + "/api/users";

    constructor(private _http: HttpClient) {

    }

    getAllUsers() {
        return this._http.get(this._url, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getUser(userId) {
        return this._http.get(this._url + "/" + userId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertUser(user) {
        return this._http.post(this._url, user, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateUser(user) {
        return this._http.put(this._url, user, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteUser(userId) {
        return this._http.delete(this._url + "/" + userId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    login(user) {
        return this._http.post(this._url + "/Login", user, this.headerConfig.httpOptions).pipe(map(res => {
            if (res) {
                localStorage.setItem('currentUser', JSON.stringify(res));
            }
            return res;
        }
        ));
    }//values?username=" + user.userName + "&password=" + user.userPassword

    logout() {
        localStorage.removeItem('currentUser');
    }
}