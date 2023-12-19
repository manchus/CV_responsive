import { ApplicationConfig, isDevMode, importProvidersFrom } from '@angular/core';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideTransloco({
        config: {
          availableLangs: ['en', 'es', 'fr'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
      importProvidersFrom(
        provideFirebaseApp(()=>initializeApp({
          apiKey: "AIzaSyCJTb1963zwqhGJKc4b71Py1B5He0ehcNg",
          authDomain: "moncv-47e4d.firebaseapp.com",
          databaseURL: "https://moncv-47e4d-default-rtdb.firebaseio.com",
          projectId: "moncv-47e4d",
          storageBucket: "moncv-47e4d.appspot.com",
          messagingSenderId: "654393496327",
          appId: "1:654393496327:web:c5c46b69c0ab9503e5aba2"
        }))
      ),
      importProvidersFrom(
        provideFirestore(()=>getFirestore())
      ),

    ]
};
