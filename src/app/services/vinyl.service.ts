import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';
import { VinylModel } from '../models/vinyl.model';

@Injectable()
export class VinylService {
  headerConfig = new HeaderConfig();

  vinyl: VinylModel;
  vinyls: VinylModel[];
  user: any;
  loggedUserId: string;
  private userLoggedIn = new Subject<boolean>();

  private _url = this.headerConfig.url + "/api/vinyls";

  constructor(private _http: HttpClient) {
    this.userLoggedIn.next(false);

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedUserId = this.user.userId;
  }

  getAllVinyls() {
    return this._http.get(this._url + "/GetVinylDetails", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }

  getVinyl(vinylId) {
    return this._http.get(this._url + "/" + vinylId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }

  insertVinyl(vinyl: any) {
    console.log(vinyl);
    vinyl.creUser = this.loggedUserId;
    return this._http.post(this._url, vinyl, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }

  updateVinyl(vinyl) {
    return this._http.put(this._url, vinyl, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }

  deleteVinyl(vinylId) {
    return this._http.delete(this._url + "/" + vinylId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }

  getVinylTypes() {
    return this._http.get(this._url + "/GetVinylTypes", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }

  getDiscogsVinyls(query) {
    return this._http.get(this._url + "/GetDiscogsVinyls/" + query, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }
}
