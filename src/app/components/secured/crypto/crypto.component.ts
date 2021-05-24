import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {
  @ViewChild('deleted', { static: false }) private deleted: SwalComponent;
  @ViewChild('error', { static: false }) private error: SwalComponent;
  balances: any;
  balance;
  btcTotal = 0;
  tryTotal = 0;
  value;
  constructor(private spinner: NgxSpinnerService, private _cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.getBalances();
  }
  getBalances() {
    this.spinner.show();
    this._cryptoService.getCryptoBalance().subscribe(data => {
      this.balances = data;
      this.findTotal(this.balances);
    },
      err => {
        this.error.fire();
        this.spinner.hide();
      },
      () => { this.spinner.hide(); });
  }

  findTotal(data){
    this.spinner.hide();
    this.value = data;
    for(let i = 0; data.length; i++){
      this.btcTotal += this.value[i].btcValue;
      this.tryTotal += this.value[i].tryValue;
    }
  }
}
