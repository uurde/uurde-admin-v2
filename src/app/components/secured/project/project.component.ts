import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  projects: any;
  project;
  projectTypes: any;
  pagedProjects = [];
  pageSize = 10;
  projectsLoading;
  p: number = 1;
  userFilter: any = { projectName: '' };

  constructor(private _projectService: ProjectService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.spinner.show();
    this._projectService.getAllProjects().subscribe(data => {
      this.projects = data;
      this.pagedProjects = _.take(this.projects, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }



  deleteProject(project) {
    var index = this.projects.indexOf(project);    
    this.project.splice(index, 1);
    this._projectService.deleteProject(project.projectId)
      .subscribe(null,
        err => {
          this.error.fire();
          this.projects.splice(index, 0, project);
        },
        () => {
          this.deleted.fire();
          this.projects.splice(index, 1);
        }
      );
  }

  select(project) {
    this.project = project;
    this._projectService.getProject(project.projectId).subscribe(data => this.project = data, null);
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedProjects = _.take(_.rest(this.projects, startIndex), this.pageSize);
  }


}
