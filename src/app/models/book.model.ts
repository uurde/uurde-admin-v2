import { BaseModel } from "./base.model";

export class BookModel extends BaseModel{
    bookId: number;
    bookName: string;
    authorName: string;
    publisherName: string;
    bookCoverPath: string;
    bookReleaseDate: Date;
    isRead: boolean;
}