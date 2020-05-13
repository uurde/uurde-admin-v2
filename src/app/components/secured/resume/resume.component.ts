import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;

  resumes: any;
  resume;
  pagedResumes = [];
  pageSize = 10;
  resumesLoading;
  p: number = 1;

  constructor(private _resumeService: ResumeService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getResumes();
  }

  getResumes() {
    this.spinner.show();
    this._resumeService.getAllResumes().subscribe(data => {
      this.resumes = data;
      this.pagedResumes = _.take(this.resumes, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  deleteResume(resume) {
    var index = this.resumes.indexOf(resume)
    this._resumeService.deleteResume(resume.resumeId)
      .subscribe(null,
        err => {
          this.error.fire();
          this.resumes.splice(index, 0, resume);
        },
        () => {
          this.deleted.fire();
          this.resumes.splice(index, 1);
        });
  }

  select(resume) {
    this.resume = resume;
    this._resumeService.getResume(resume.resumeId).subscribe(data => this.resume = data, null);
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedResumes = _.take(_.rest(this.resumes, startIndex), this.pageSize);
  }

}
