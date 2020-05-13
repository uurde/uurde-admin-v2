import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  skills: any;
  skill;
  pagedSkills = [];
  pageSize = 10;
  p: number = 1;

  constructor(private _skillService: SkillService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.spinner.show();
    this._skillService.getAllSkills().subscribe(data => {
      this.skills = data;
      this.pagedSkills = _.take(this.skills, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  deleteSkill(skill) {
      var index = this.skills.indexOf(skill)
      this._skillService.deleteSkill(skill.skillId)
        .subscribe(null,
          err => {
            this.error.fire();
            this.skills.splice(index, 0, skill);
          },
          () => {
            this.deleted.fire();
            this.skills.splice(index, 1);
          });
  }

  select(skill) {
    this.skill = skill;
    this._skillService.getSkill(skill.skillId).subscribe(data => this.skill = data, null);
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedSkills = _.take(_.rest(this.skills, startIndex), this.pageSize);
  }

}
