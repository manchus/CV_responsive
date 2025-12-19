import {  APP_INITIALIZER, ApplicationConfig,  isDevMode, provideZoneChangeDetection} from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { environment } from '../environments/environment';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
import { TranslocoService, provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { AvailableLanguages, AvailablesLanguages } from './transloco-config';

export function initializeTransloco(translocoService: TranslocoService) {
  return () => {
    const browserLang = navigator.language.split('-')[0];
    const availableLangs = translocoService.getAvailableLangs() as string[];
    if (availableLangs.includes(browserLang)) {
      translocoService.setActiveLang(browserLang);
    } else {
      translocoService.setActiveLang(AvailableLanguages.FR);
    }
  };
}

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
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTransloco,
      deps: [TranslocoService],
      multi: true,
    },
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),
    provideFirestore(() => getFirestore()),
   // provideDatabase(() => getDatabase()),
  ],
};
