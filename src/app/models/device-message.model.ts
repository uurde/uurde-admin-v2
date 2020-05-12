import { BaseModel } from "./base.model";

export class DeviceMessageModel extends BaseModel {
    deviceMessageId?: number;
    topic: string;
    message: number;
    messageType: string;
    fullMessage: string;
}