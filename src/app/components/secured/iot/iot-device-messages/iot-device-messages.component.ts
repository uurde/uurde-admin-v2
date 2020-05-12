import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";

import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-iot-device-messages',
  templateUrl: './iot-device-messages.component.html',
  styleUrls: ['./iot-device-messages.component.css']
})
export class IotDeviceMessagesComponent implements OnInit {
  deviceMessages: any;
  deviceMessage;
  pagedDeviceMessages = [];
  pageSize = 10;
  p: number = 1;

  constructor(private _iotService: IotService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDeviceMessages();
  }

  getDeviceMessages() {
    this.spinner.show();
    this._iotService.getAllDeviceMessages().subscribe(data => {
      this.deviceMessages = data;
      this.pagedDeviceMessages = _.take(this.deviceMessages, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  select(deviceMessage) {
    this.deviceMessage = deviceMessage;
    this._iotService.getDeviceMessage(deviceMessage.deviceMessageId).subscribe(data => this.deviceMessage = data, null);
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedDeviceMessages = _.take(_.rest(this.deviceMessages, startIndex), this.pageSize);
  }
}
