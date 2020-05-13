import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  contacts: any;
  contact;
  pagedContacts = [];
  pageSize = 10;
  p: number = 1;
  userFilter: any = { senderFullName: '' };
  constructor(private _contactService: ContactService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.spinner.show();
    this._contactService.getAllContacts().subscribe(data => {
      this.contacts = data;
      this.pagedContacts = _.take(this.contacts, this, this.pageSize);
    },
      null,
      () => { this.spinner.hide(); });
  }

  save() {
    if (this.contact.id)
      this._contactService.updateContact(this.contacts);
    else
      this._contactService.insertContact(this.contact);
  }

  deleteContact(contact) {
    var index = this.contacts.indexOf(contact)
    this.contacts.splice(index, 1);
    this._contactService.deleteContact(contact.contactId)
      .subscribe(null,
        err => {
          this.error.fire();
          this.contacts.splice(index, 0, contact);
        },
        () => {
          this.deleted.fire();
          this.contacts.splice(index, 1);
        });
  }

  select(contact) {
    this.contact = contact;
    this._contactService.getContact(contact.contactId)
      .subscribe(
        data =>
          this.contact.comments = data,
        null
      );
  }

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedContacts = _.take(_.rest(this.contacts, startIndex), this.pageSize);
  }

}
