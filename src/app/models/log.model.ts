import { BaseModel } from "./base.model";

export class LogModel extends BaseModel {
    logId?: number;
    message: string;
    logTypeId: number;
    logTypeName: string;
    actionPath: string;
}