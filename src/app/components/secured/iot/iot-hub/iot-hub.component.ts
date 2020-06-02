import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";

import { IotService } from 'src/app/services/iot.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-iot-hub',
  templateUrl: './iot-hub.component.html',
  styleUrls: ['./iot-hub.component.css']
})
export class IotHubComponent implements OnInit {
  public onColor: string = 'success';
  public offColor: string = 'danger';
  public size = 'small';
  devices: any;
  device;

  contacts: any;
  contact;

  constructor(private _router: Router, private _route: ActivatedRoute, private _iotService: IotService, private _contactService: ContactService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDevices();
    //this.getUnreadContacts();
  }

  getDevices() {
    this.spinner.show();
    this._iotService.getAllDevices().subscribe(data => { this.devices = data; }, null, () => { this.spinner.hide(); });
  }

  getUnreadContacts() {
    this.spinner.show();
    this._contactService.getUnreadContacts().subscribe(data => { this.devices = data; }, null, () => { this.spinner.hide(); });
  }

  onFilterChange(eve: any) {
    this.spinner.show();
    var result;
    result = this._iotService.toggleDevice(eve);
    result.subscribe(x => { this._router.navigate(['/iot-hub']); }, null, () => { this.spinner.hide(); });
  }
}
