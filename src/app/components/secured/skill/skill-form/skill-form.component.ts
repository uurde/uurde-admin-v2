import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SkillService } from 'src/app/services/skill.service';
import { SkillModel } from '../../../../models/skill.model';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {
  title: string;
  skill = new SkillModel();
  skillForm: FormGroup;
  path;

  constructor(private _router: Router, private _route: ActivatedRoute, private _skillService: SkillService) {

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var id = +params["id"];
      this.title = id ? "Edit Skill" : "New Skill";
      if (!id)
        return;
      this._skillService.getSkill(id).subscribe(
        data => {
          this.skill = data as any;
        },
        response => {
          if (response.status == 404) {
            this._router.navigate(['skill']);
          }
        }
      );
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        let path = reader.result;
        //this.skill.skillLogoPath = path;
      }
    }
  }

  save() {
    var result;
    if (this.skill.skillId == null)
      result = this._skillService.insertSkill(this.skill);
    else
      result = this._skillService.updateSkill(this.skill);

    result.subscribe(x => { this._router.navigate(['skill']); });
  }

  cancel() {
    this._router.navigate(['skill']);
  }
}
