import { Injectable } from '@angular/core';
import { Product } from '../shared/types/product';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


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

  getOne(id: string) : Observable<any> {
    return this.db.doc<any>(this.dbPath + `/${id}`).valueChanges();
  }

  create(product: Product): any {
    return this.productsRef.add({ ...product });
  }

  update(id: string, data: any) {
    const productDoc = this.db.doc<any>(this.dbPath + `/${id}`);
    return productDoc.update(data);
  }

  delete(id: string){
    const productDoc = this.db.doc<any>(this.dbPath + `/${id}`);
    return productDoc.delete();
  }
}
