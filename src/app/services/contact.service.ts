import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { HeaderConfig } from 'src/app/services/header.config';

@Injectable()
export class ContactService {
    headerConfig = new HeaderConfig();

    private _url = this.headerConfig.url + "/api/contacts";

    constructor(private _http: HttpClient) {

    }

    getAllContacts() {
        return this._http.get(this._url, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getContact(contactId) {
        return this._http.get(this._url + "/" + contactId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    insertContact(contact) {
        return this._http.post(this._url, contact, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    updateContact(contact) {
        return this._http.put(this._url + "/" + contact.contactId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    deleteContact(contactId) {
        return this._http.delete(this._url + "/" + contactId, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    sendMail(contact) {
        return this._http.post(this._url + "/SendMail", contact, this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }

    getNotRepliedContacts() {
        return this._http.get(this._url + "/GetNotRepliedContacts", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }    

    getUnreadContacts() {
        return this._http.get(this._url + "/GetUnreadContacts", this.headerConfig.httpOptions).pipe(tap(res => { return res; }));
    }
}