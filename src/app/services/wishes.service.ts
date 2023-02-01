import { Injectable } from '@angular/core';
import { Wish } from '../shared/types/wish';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  wishesRef!: AngularFirestoreCollection<Wish>;
  private dbPath = '/wishes';

  constructor(
    private db: AngularFirestore
  ) { 
    this.wishesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Wish> {
    return this.wishesRef;
  }

  create(wish: any): any {
    return this.wishesRef.add({ ...wish });
  }

  update(id: string, data: any): Promise<void> {
    return this.wishesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.wishesRef.doc(id).delete();
  }
}
