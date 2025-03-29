import {TranslocoGlobalConfig } from '@jsverse/transloco-utils';
export enum AvailableLanguages {
  EN = 'en',
  FR = 'fr',
  ES = 'es',


}

/*export const translocoConfig: TranslocoConfig = {
  availableLangs: ['en', 'es', 'fr'],
  defaultLang: 'en',
  reRenderOnLangChange: true,
  fallbackLang: 'en',
  // Añade persistencia del idioma
  missingHandler: {
    useFallbackTranslation: true,
  },
};*/

export const AvailablesLanguages = [
  AvailableLanguages.EN,
  AvailableLanguages.FR,
  AvailableLanguages.ES,
]


const config: TranslocoGlobalConfig = {
  langs: AvailablesLanguages,
  defaultLang: AvailableLanguages.FR,
  rootTranslationsPath: 'src/assets/i18n/',


}



export default config;

