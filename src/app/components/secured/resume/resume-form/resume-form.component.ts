import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { ResumeService } from 'src/app/services/resume.service';
import { ResumeModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})
export class ResumeFormComponent implements OnInit {
  @ViewChild('saved', { static: false }) private saved: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;

  title: string;
  resume = new ResumeModel();
  resumeForm: FormGroup;
  path;

  constructor(private _router: Router, private _route: ActivatedRoute, private _resumeService: ResumeService) {

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var id = +params["id"];
      this.title = id ? "Edit Resume" : "New Resume";
      if (!id)
        return;
      this._resumeService.getResume(id).subscribe(
        data => {
          this.resume = data as any;
        },
        response => {
          if (response.status == 404) {
            this._router.navigate(['resume']);
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
        //this.resume.companyLogoPath = path;
      }
    }
  }

  save() {
    var result;
    if (this.resume.resumeId == null)
      result = this._resumeService.insertResume(this.resume);
    else
      result = this._resumeService.updateResume(this.resume);

    result.subscribe(
      x => {
        this._router.navigate(['resume']);
      },
      err => {
        this.error.fire();
      },
      () => {
        this.saved.fire();
      });
  }

  cancel() {
    this._router.navigate(['resume']);
  }

}
