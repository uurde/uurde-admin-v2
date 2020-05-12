import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';
import { ResumeModel } from '../models/resume.model';

@Injectable()
export class ResumeService {
    headerConfig = new HeaderConfig();

    resume: ResumeModel;
    resumes: ResumeModel[];

    private _url = this.headerConfig.url + "/api/resumes";

    constructor(private _http: HttpClient) {

    }

    getAllResumes() {
        return this._http.get(this._url, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getResume(resumeId) {
        return this._http.get(this._url + "/" + resumeId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertResume(resume) {
        return this._http.post(this._url, resume, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateResume(resume) {
        return this._http.put(this._url, resume, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteResume(resumeId) {
        return this._http.delete(this._url + "/" + resumeId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}