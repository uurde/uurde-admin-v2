import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";

import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-iot-hub',
  templateUrl: './iot-hub.component.html',
  styleUrls: ['./iot-hub.component.css']
})
export class IotHubComponent implements OnInit {
  public onColor: string = 'success';
  public offColor: string = 'danger';
  public size = 'mini';

  messages: any;
  devices: any;
  device;

  constructor(private _router: Router, private _route: ActivatedRoute, private _iotService: IotService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDevices();
    this.getMessages();
  }

  getDevices() {
    this.spinner.show();
    this._iotService.getAllDevices().subscribe(data => { this.devices = data; }, null, () => { this.spinner.hide(); });
  }

  getMessages() {
    this.spinner.show();
    this._iotService.getLastMessage().subscribe(data => { this.messages = data; }, null, () => { this.spinner.hide(); });
  }

  toggleState(eve: any) {
    this.spinner.show();
    var result;
    result = this._iotService.toggleDevice(eve);
    result.subscribe(x => { this._router.navigate(['/iot-hub']); }, null, () => { this.spinner.hide(); });
  }
}
