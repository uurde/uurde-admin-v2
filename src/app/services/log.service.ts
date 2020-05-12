import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LogModel } from 'src/app/models/log.model';
import { HeaderConfig } from 'src/app/services/header.config';

@Injectable()
export class LogService {
    headerConfig = new HeaderConfig();

    private _url = this.headerConfig.url + "/api/logs";

    constructor(private _http: HttpClient) {

    }

    getAllLogs() {
        return this._http.get(this._url + "/GetLogDetails", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getLog(logId) {
        return this._http.get(this._url + "/" + logId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertLog(log) {
        return this._http.post(this._url, this.headerConfig.httpOptions, log).pipe(tap(res => { return res; }));
    }

    updateLog(log) {
        return this._http.put(this._url + "/" + log.logId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteLog(logId) {
        return this._http.delete(this._url + "/" + logId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}