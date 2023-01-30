import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';

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

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    amount: new FormControl(0.00, [Validators.required])
  });

  constructor(private productService: ProductService) {
  }

  openModal(id: any) {
    this.isModalOpen = true;
    this.currentProductId = id;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.getProducts();
  }

  calculateProgress(amount: any, id: string) {
    this.productService.getOne(id).subscribe((data: Product) => {
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
    ).subscribe(data => {
      this.products = data;
    });
  }

  paymentInit() {
    console.log('Payment initialized');
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.form.reset();
    this.handleModalClose();
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(ref);
    let amount = this.form.get('amount')?.value;
    let progress = this.calculateProgress(amount, this.currentProductId);
    this.product.progress = progress;
    this.productService.update(this.currentProductId, this.product).then(() => {
      console.log("thank you");
    })
  }

  paymentCancel() {
    console.log('payment failed');
  }

  get fc() {
    return this.form.controls;
  }
}
