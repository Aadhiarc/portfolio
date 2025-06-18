import { Injectable, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

import { doc, getDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  getHeaders(): Observable<any[]> {
    const docRef = doc(this.firestore, 'portfolio', 'home');
    return from(
      getDoc(docRef).then((snapshot) => {
        const data = snapshot.data();
        return data?.['headers'] || [];
      })
    );
  }

  getAbout(): Observable<any> {
    const docRef = doc(this.firestore, 'portfolio', 'home');
    return from(
      getDoc(docRef).then((snapshot) => {
        const data = snapshot.data();
        return data?.['aboutMe'] || [];
      })
    );
  }
  getSocialMedia(): Observable<any[]> {
    const docRef = doc(this.firestore, 'portfolio', 'home');
    return from(
      getDoc(docRef).then((snapshot) => {
        const data = snapshot.data();
        return data?.['socialMedia'] || [];
      })
    );
  }

  getSkills(): Observable<any[]> {
    const docRef = doc(this.firestore, 'portfolio', 'home');
    return from(
      getDoc(docRef).then((snapshot) => {
        const data = snapshot.data();
        return data?.['skills'] || [];
      })
    );
  }
}
