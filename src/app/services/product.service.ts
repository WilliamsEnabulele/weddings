import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsRef!: AngularFirestoreCollection<Product>;
  private dbPath = '/products';

  constructor(
    private db: AngularFirestore
  ) { 
    this.productsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Product> {
    return this.productsRef;
  }

  getOne(id: string){
    return this.productsRef.doc(id).get();
  }

  create(product: Product): any {
    return this.productsRef.add({ ...product });
  }

  update(id: string, data: any): Promise<void> {
    return this.productsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.productsRef.doc(id).delete();
  }
}
