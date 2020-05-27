import { BaseModel } from "./base.model";

export class VinylModel extends BaseModel{
    vinylId: number;
    artistName: string;
    albumName: string;
    albumReleaseDate: string;
    albumReleaseYear: number;
    albumCoverPath: string;
    albumGenre: string;
    vinylTypeId: number;
    vinylTypeName: string;
}