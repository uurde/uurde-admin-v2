import { BaseModel } from "./base.model";

export class VinylModel extends BaseModel{
    vinylId: number;
    artistName: string;
    albumName: string;
    albumReleaseDate: string;
    albumCoverPath: string;
    vinylTypeId: number;
    vinylTypeName: string;
}