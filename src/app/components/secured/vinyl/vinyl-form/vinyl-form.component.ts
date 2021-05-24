import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { VinylService } from 'src/app/services/vinyl.service';
import { VinylModel } from '../../../../models/vinyl.model';
//import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-vinyl-form',
  templateUrl: './vinyl-form.component.html',
  styleUrls: ['./vinyl-form.component.css']
})
export class VinylFormComponent implements OnInit {
  @ViewChild('saved', { static: false }) private saved: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  @ViewChild('get', { static: false }) private get: SwalComponent;
  title: string;
  vinyl = new VinylModel();
  vinylForm: FormGroup;
  path;
  vinylTypes: any;
  discogsVinyls: any;

  constructor(private _router: Router, private _route: ActivatedRoute, private _vinylService: VinylService) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var id = +params["id"];
      this.title = id ? "Edit Vinyl" : "New Vinyl";
      if (!id)
        return;
      this._vinylService.getVinyl(id).subscribe(
        data => {
          this.vinyl = data as any;
        },
        response => {
          if (response.status == 404) {
            this._router.navigate(['vinyl']);
          }
        }
      );
    });
    this.getVinylTypes();
  }
  selectchange(args) {
    this.vinyl.vinylTypeId = args.target.selectedIndex;
  }

  save() {
    var result;
    if (this.vinyl.vinylId == null){
    console.log("insert");
    console.log(this.vinyl);
      result = this._vinylService.insertVinyl(this.vinyl);
    }
    else
      result = this._vinylService.updateVinyl(this.vinyl);

    result.subscribe(
      x => {
        this._router.navigate(['vinyl']);
      },
      err => {
        this.error.fire();
      },
      () => {
        this.saved.fire();
      });
  }

  cancel() {
    this._router.navigate(['vinyl']);
  }

  getVinylTypes() {
    this._vinylService.getVinylTypes().subscribe(data => { this.vinylTypes = data; }, null);
  }

  getDiscogsVinyls(artistName, albumName) {
    this._vinylService.getDiscogsVinyls(artistName + "-" + albumName).subscribe(
      data => { this.discogsVinyls = data },
      err => { this.get.fire(); }
    );
  }

  setVinyl(discogsVinyl) {
    this.vinyl.albumReleaseYear = discogsVinyl.year;
    this.vinyl.albumGenre = discogsVinyl.genre;
    this.vinyl.albumCoverPath = discogsVinyl.coverImage;
  }

  focusOutFunction() {
    console.log("focus out");
  }

  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '20rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no'
  // };
}
