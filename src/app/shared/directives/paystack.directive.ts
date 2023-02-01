import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PaystackService } from 'src/app/services/paystack.service';

@Directive({
  selector: '[custom-paystack]'
})
export class PaystackDirective {

  @Input() email!: string;
  @Input() amount!: number;
  @Input() key!: string;
  @Output() callback = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<any>();
  PaystackPop: any;

  constructor(private paystack: PaystackService){

  }

  cpaymentInit (e: Event) {
    console.log('TRIGGERED 1')
    e.preventDefault();
    console.log('TRIGGERED 2')
    let handler = this.PaystackPop.setup({
      key: this.key,
      email: this.email,
      amount: this.amount * 100,
      currency: 'NGN', 
      ref: '' + Math.floor((Math.random() * 1000000000) + 1),
      onClose: (data: any) => {
        this.onClose = data;
      },
      callback: (response: any) => {
        this.callback = response.reference;
      }
    });
    handler.openIframe();
  }

}
