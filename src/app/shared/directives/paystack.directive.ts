import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { PaystackService } from 'src/app/services/paystack.service';



@Directive({
  selector: '[custom-paystack]'
})
export class PaystackDirective {
  @Input() email!: string;
  @Input() amount!: number;
  @Input() key!: string;
  @Output() onSuccess = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  private formElement!: HTMLFormElement;
  private submitEventListener!: () => void;
  

  constructor(private elementRef: ElementRef){
  }

  ngAfterViewInit() {
    this.formElement = this.elementRef.nativeElement;
    this.submitEventListener = this.paymentInit.bind(this);
    this.formElement.addEventListener('submit', this.submitEventListener, false);
  }

  ngOnDestroy() {
    this.formElement.removeEventListener('submit', this.submitEventListener, false);
  }

  paymentInit () {
    const PaystackPop = require('@paystack/inline-js');
    const paystack = new PaystackPop();
    paystack.transaction({
      key: this.key,
      email: this.email,
      amount: this.amount * 100,
      currency: 'NGN', 
      ref: '' + Math.floor((Math.random() * 1000000000) + 1),
      onCancel: (data: any) => {
        this.onCancel.emit(data);
      },
      onSuccess: (response: any) => {
        this.onSuccess.emit(response.reference);
      }
    });
  }
}
