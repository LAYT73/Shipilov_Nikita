import { createPluralize, I18N, useTranslate as useTranslateBase } from '@ayub-begimkulov/i18n';

import en from './keys/en.json';
import ru from './keys/ru.json';

const pluralizeEn = createPluralize('en');
const pluralizeRu = createPluralize('ru');

export const i18n = new I18N({
    defaultLang: 'ru',
    languages: {
        en: {
            keyset: en,
            pluralize: pluralizeEn,
        },
        ru: {
            keyset: ru,
            pluralize: pluralizeRu,
        },
    },
});

export const useTranslate = useTranslateBase<typeof i18n>;
