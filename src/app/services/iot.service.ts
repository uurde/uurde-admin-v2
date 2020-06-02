import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeaderConfig } from 'src/app/services/header.config';
import { DeviceModel } from '../models/device.model';
import { DeviceMessageModel } from '../models/device-message.model';

@Injectable()
export class IotService {
    headerConfig = new HeaderConfig();

    device: DeviceModel;
    devices: DeviceModel[];

    deviceMessage: DeviceMessageModel;
    deviceMessages: DeviceMessageModel[];

    private _urlDevice = this.headerConfig.url + "/api/iotDevices";
    private _urlMessage = this.headerConfig.url + "/api/iotDeviceMessages";

    constructor(private _http: HttpClient) {

    }


    getAllDevices() {
        return this._http.get(this._urlDevice, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getDevice(deviceId) {
        return this._http.get(this._urlDevice + "/" + deviceId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertDevice(device) {
        return this._http.post(this._urlDevice, device, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateDevice(device) {
        return this._http.put(this._urlDevice, device, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteDevice(deviceId) {
        return this._http.delete(this._urlDevice + "/" + deviceId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getAllDeviceMessages() {
        return this._http.get(this._urlMessage, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getDeviceMessage(deviceMessageId) {
        return this._http.get(this._urlMessage + "/" + deviceMessageId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    toggleDevice(device) {
        return this._http.put(this._urlDevice + "/ToggleState", device, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getLastMessage() {
        return this._http.get(this._urlMessage + "/LastMessages", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}