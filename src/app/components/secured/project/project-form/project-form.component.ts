import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { ProjectService } from 'src/app/services/project.service';
import { ProjectModel } from '../../../../models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @ViewChild('saved', { static: false }) private saved: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  title: string;
  project = new ProjectModel();
  projectForm: FormGroup;
  path;
  projectTypes: any;

  constructor(private _router: Router, private _route: ActivatedRoute, private _projectService: ProjectService) {

  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      var id = +params["id"];
      this.title = id ? "Edit Project" : "New Project";
      if (!id)
        return;
      this._projectService.getProject(id).subscribe(
        data => {
          this.project = data as any;
        },
        response => {
          if (response.status == 404) {
            this._router.navigate(['project']);
          }
        }
      );
    });
    this.getProjectTypes();
  }
  selectchange(args) {
    this.project.projectTypeId = args.target.value;
  }

  save() {
    var result;
    if (this.project.projectId == null)
      result = this._projectService.insertProject(this.project);
    else
      result = this._projectService.updateProject(this.project);

    result.subscribe(
      x => { this._router.navigate(['project']); },
      err => {
        this.error.fire();
      },
      () => {
        this.saved.fire();
      }
    );
  }

  cancel() {
    this._router.navigate(['project']);
  }

  getProjectTypes() {
    this._projectService.getProjectTypes().subscribe(data => {
      this.projectTypes = data;
    },
      null);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        let path = reader.result;
        //this.project.projectImagePath = path;
      }
    }
  }
}
