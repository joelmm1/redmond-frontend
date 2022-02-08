import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {

  navigation
  footer

  subscriptions: Subscription[] = []
  
  constructor(private afs: AngularFirestore) {
    this.subscriptions.push(this.afs.doc('public/navigation').get().pipe(map(doc => this.navigation = doc.data()))
      .subscribe());
    this.subscriptions.push(this.afs.doc('public/footer').get().pipe(map(doc => this.footer = doc.data()))
      .subscribe());
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }
  

}
