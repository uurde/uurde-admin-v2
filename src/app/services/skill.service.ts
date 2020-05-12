import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';
import { SkillModel } from '../models/skill.model';

@Injectable()
export class SkillService {
    headerConfig = new HeaderConfig();

    skill: SkillModel;
    skills: SkillModel[];

    private _url = this.headerConfig.url + "/api/skills";

    constructor(private _http: HttpClient) {

    }

    getAllSkills() {
        return this._http.get(this._url, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getSkill(skillId) {
        return this._http.get(this._url + "/" + skillId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertSkill(skill) {
        return this._http.post(this._url, skill, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateSkill(skill) {
        return this._http.put(this._url, skill, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteSkill(skillId) {
        return this._http.delete(this._url + "/" + skillId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}