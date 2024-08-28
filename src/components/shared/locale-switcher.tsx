import { useLocale } from 'next-intl';

import LocaleSwitcherSelect from './locale-switcher-select';
import { locales } from '@/config';

export default function LocaleSwitcher() {
  const locale = useLocale();
  console.log(locales);

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {locales.map((cur) => (
        <option key={cur} value={cur} className="font-bold">
          {cur.toUpperCase()}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
