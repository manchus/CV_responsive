import {TranslocoGlobalConfig } from '@jsverse/transloco-utils';
export enum AvailableLanguages {
  EN = 'en',
  FR = 'fr',
  ES = 'es',
}

export const AvailablesLanguages = [
  AvailableLanguages.EN,
  AvailableLanguages.FR,
  AvailableLanguages.ES,
]

const config: TranslocoGlobalConfig = {
  langs: AvailablesLanguages,
  defaultLang: AvailableLanguages.EN,
  rootTranslationsPath: 'src/assets/i18n/',
}

export default config;

