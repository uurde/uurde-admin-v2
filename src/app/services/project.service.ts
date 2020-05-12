import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';
import { ProjectModel } from '../models/project.model';

@Injectable()
export class ProjectService {
    headerConfig = new HeaderConfig();

    project: ProjectModel;
    projects: ProjectModel[];

    private _url = this.headerConfig.url + "/api/projects";

    constructor(private _http: HttpClient) {

    }

    getAllProjects() {
        return this._http.get(this._url + "/GetProjectDetails", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getProject(projectId) {
        return this._http.get(this._url + "/" + projectId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertProject(project) {
        return this._http.post(this._url, project, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateProject(project) {
        return this._http.put(this._url, project, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteProject(projectId) {
        return this._http.delete(this._url + "/" + projectId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getProjectTypes() {
        return this._http.get(this._url + "/GetProjectTypes", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}