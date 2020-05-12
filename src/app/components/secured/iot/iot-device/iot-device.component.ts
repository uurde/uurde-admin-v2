import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";

import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-iot-device',
  templateUrl: './iot-device.component.html',
  styleUrls: ['./iot-device.component.css']
})
export class IotDeviceComponent implements OnInit {
  devices: any;
  device;
  pagedDevices = [];
  pageSize = 10;
  p: number = 1;

  constructor(private _iotService: IotService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDevices();
  }
  getDevices() {
    this.spinner.show();
    this._iotService.getAllDevices().subscribe(data => {
      this.devices = data;
      this.pagedDevices = _.take(this.devices, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  deleteDevice(device) {
    if (confirm("Are you sure you want to disactive device?")) {
      var index = this.devices.indexOf(device)
      this._iotService.deleteDevice(device.deviceId)
        .subscribe(null,
          err => {
            alert("Could not delete the device.");
          });
    }
  }

  select(device) {
    this.device = device;
    this._iotService.getDevice(device.deviceId).subscribe(data => this.device = data, null);
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedDevices = _.take(_.rest(this.devices, startIndex), this.pageSize);
  }
}
