import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';

@Injectable()
export class CryptoService {
  headerConfig = new HeaderConfig();

  // user: UserModel;
  // users: UserModel[];

  private userLoggedIn = new Subject<boolean>();

  private _url = this.headerConfig.url + "/api/ExchangeRates";

  constructor(private _http: HttpClient) {
    this.userLoggedIn.next(false);
  }

  getCryptoBalance() {
    return this._http.get(this._url + "/GetCryptoBalance", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
  }
}
