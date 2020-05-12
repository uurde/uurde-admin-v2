import { BaseModel } from "./base.model";

export class DeviceModel extends BaseModel {
    deviceId?: number;
    deviceName: string;
    deviceType: number;
    deviceBrand: string;
    deviceState: string;
}