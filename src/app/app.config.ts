import {  ApplicationConfig,  isDevMode, provideZoneChangeDetection} from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { environment } from '../environments/environment';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { AvailableLanguages, AvailablesLanguages } from './transloco-config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: AvailablesLanguages,
        defaultLang: AvailableLanguages.FR,
        reRenderOnLangChange: true,
        //prodMode: environment.production,
        prodMode: !isDevMode(),
        fallbackLang: AvailableLanguages.FR,
        missingHandler: {
          useFallbackTranslation: true,
        },
      },
      loader: TranslocoHttpLoader,
    }),
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
