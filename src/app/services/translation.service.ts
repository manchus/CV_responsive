// translation.service.ts
import { Injectable } from '@angular/core';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translateClient: Translate;

  constructor(private firestore: Firestore) {
    this.translateClient = new Translate({
      projectId: 'YOUR_PROJECT_ID',
      keyFilename: 'PATH_TO_SERVICE_ACCOUNT_KEY.json'
    });
  }

  async translatePost(postId: string, targetLanguage: string): Promise<string> {
    // Get the original post from Firestore
    const postRef = doc(this.firestore, 'posts', postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error('Post not found');
    }

    const postData = postSnap.data();
    /*
    const originalText = postData.content; // Adjust based on your field name
    const originalLanguage = postData.lang; // The field storing origin language


    // Perform translation
    const [translation] = await this.translateClient.translate(originalText, {
      from: originalLanguage,
      to: targetLanguage
    });

    return translation;
    */
    return "exit";
  }
}
