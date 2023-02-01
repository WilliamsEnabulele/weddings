import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PaystackService } from 'src/app/services/paystack.service';

@Directive({
  selector: '[custom-paystack]'
})
export class PaystackDirective {

  @Input() email!: string;
  @Input() amount!: number;
  @Input() key!: string;
  @Output() paymentInitEvent!: EventEmitter<any>;
  @Output() paymentCancelEvent!: EventEmitter<any>;
  @Output() paymentDoneEvent!: EventEmitter<any>;
  PaystackPop: any;

  constructor(private paystack: PaystackService){

  }

  paymentInit (e: Event) {
    e.preventDefault();
    console.log('TRIGGERED')
    let handler = this.PaystackPop.setup({
      key: this.key,
      email: this.email,
      amount: this.amount * 100,
      currency: 'NGN', 
      ref: '' + Math.floor((Math.random() * 1000000000) + 1),
      onClose: (data: any) => {
        this.paymentCancel = data;
      },
      callback: (response: any) => {
        this.paymentDone(response.reference);
      }
    });
    handler.openIframe();
  }

  paymentDone(ref: string){
    this.paystack.confirmPayment(ref).subscribe({
      next: (data: any) => {
        this.paymentDoneEvent = data;
      },
      error: () => {
        // Todo
      }
    });
  }
  
  paymentCancel(data: any){
    this.paymentCancelEvent = data;
  }
  

}
