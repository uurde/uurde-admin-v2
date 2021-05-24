import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { VinylService } from 'src/app/services/vinyl.service';

@Component({
  selector: 'app-vinyl',
  templateUrl: './vinyl.component.html',
  styleUrls: ['./vinyl.component.css']
})
export class VinylComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  vinyls: any;
  vinyl;
  pagedVinyls = [];
  pageSize = 10;
  vinylsLoading;
  p: number = 1;
  sum: number = 0;

  constructor(private _vinylService: VinylService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getVinyls();
  }
  getVinyls() {
    this.spinner.show();
    this._vinylService.getAllVinyls().subscribe(data => {
      this.vinyls = data;
      this.sum = this.vinyls.length;
      this.pagedVinyls = _.take(this.vinyls, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  deleteVinyl(vinyl) {
    var index = this.vinyls.indexOf(vinyl)
    this._vinylService.deleteVinyl(vinyl.vinylId)
      .subscribe(null,
        err => {
          this.error.fire();
          this.vinyls.splice(index, 0, vinyl);
        },
        () => {
          this.deleted.fire();
          this.vinyls.splice(index, 1);
        });
  }

  select(vinyl) {
    this.vinyl = vinyl;
    this._vinylService.getVinyl(vinyl.vinylId).subscribe(data => this.vinyl = data, null);
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedVinyls = _.take(_.rest(this.vinyls, startIndex), this.pageSize);
  }
}
