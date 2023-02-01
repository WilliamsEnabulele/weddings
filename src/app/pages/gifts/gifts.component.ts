import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/types/product';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { environment } from 'src/environments/environment';

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
  product: any;
  currentProductId!: string;
  isModalOpen = false;
  loading = true;
  sayThankYou = false;
  key = environment.paystack_key;

  options: AnimationOptions = {
    path: '/assets/lotties/confetti.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    amount: new FormControl(0.00, [Validators.required, Validators.max(500000)])
  });

  constructor(private productService: ProductService) {
  }

  openModal(id: any) {
    this.isModalOpen = true;
    this.currentProductId = id;
  }

  handleModalClose() {
    this.isModalOpen = false;
    this.sayThankYou =false;
    this.form.reset();
  }

  ngOnInit() {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.getProducts();
  }

  calculateProgress(amount: any, id: string) {
    this.productService.getOne(id).subscribe((data: Product) => {
      console.log(data);
      this.product = data;
    })
    let currentPrice = this.product.price - amount;
    return 100 - ((currentPrice / this.product.price) * 100);
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
    }})
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull, close modal';
    console.log(ref);
    let amount = this.form.get('amount')?.value;
    let progress = this.calculateProgress(amount, this.currentProductId);
    this.product.progress = progress;
    this.productService.update(this.currentProductId, this.product).then(() => {
      this.sayThankYou = true;
      this.form.reset();
    })
  }

  paymentCancel() {
    console.log('payment failed');
  }

  get fc() {
    return this.form.controls;
  }
}
