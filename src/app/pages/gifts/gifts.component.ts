import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/types/product';
import { AnimationOptions } from 'ngx-lottie';
import { environment } from 'src/environments/environment';
import {
  Flutterwave,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent {
  reference = '';
  title!: string;
  products!: Product[];
  currentPrice!: number;
  product!: Product;
  currentProductId!: string;
  isModalOpen = false;
  loading = true;
  sayThankYou = false;
  key = environment.flutterwave_key;
  paymentData: any;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    amount: new FormControl(100, [Validators.required, Validators.minLength(100)])
  });

  constructor(
    private productService: ProductService,
    private flutterwave: Flutterwave
  ) {
  }

  options: AnimationOptions = {
    path: '/assets/lotties/confetti.json',
  };

  openModal(id: any) {
    this.isModalOpen = true;
    this.currentProductId = id;
  }

  handleModalClose() {
    this.isModalOpen = false;
    this.sayThankYou = false;
    this.form.reset();
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.products = data;
        error: () => {
          this.loading = false;
        }
      }
    })
  }



  makePayment() {
    if(this.form.invalid)
      return;
    const customerDetails = {
      email: this.form.get('email')?.value,
    };
    this.paymentData = {
      public_key: environment.flutterwave_key,
      tx_ref: this.generateReference(),
      amount: this.form.get('amount')?.value,
      currency: "NGN",
      customer: customerDetails,
      payment_options: "card,ussd",
      callback: this.makePaymentCallback,
      onclose: this.closedPaymentModal,
      callbackContext: this,
    }
    this.flutterwave.inlinePay(this.paymentData);
  }

  calculateAndUpdateProgress() {
    let amount = this.form.get('amount')?.value;
    this.productService.getOne(this.currentProductId).pipe(
      take(1)
    ).subscribe((product: Product) => {
      let currentPrice = (product.price! - amount!);
      const progress = Math.round(100 - ((currentPrice / product.price!) * 100));
      this.productService.update(this.currentProductId, { progress: progress });
      this.form.reset(this.form.value);
      this.sayThankYou = true;
    })
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    this.calculateAndUpdateProgress();
  }

  closedPaymentModal(): void {
    this.sayThankYou = false;
    this.form.reset(this.form.value);
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

  get fc() {
    return this.form.controls;
  }
}
