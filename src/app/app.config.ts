import {
  ApplicationConfig,
  isDevMode
} from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { environment } from '../environments/environment';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
//import { provideTransloco } from '@ngneat/transloco';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { AvailableLanguages, AvailablesLanguages } from './transloco-config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: AvailablesLanguages,
        defaultLang: AvailableLanguages.EN,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        //prodMode: environment.production,
      },
      //loader: TranslocoHttpLoader,
      loader: TranslocoHttpLoader,
    }),
    //   config: {
    //     availableLangs: ['en', 'es', 'fr'],
    //     defaultLang: 'en',
    //     reRenderOnLangChange: true,
    //     //prodMode: !isDevMode(),
    //     prodMode: environment.production,
    //   },
    //   //loader: TranslocoHttpLoader,
    //   loader: TranslocoHttpLoader,
    // }),
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
