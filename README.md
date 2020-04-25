JavaScript and TypeScript Smart Pluralisation
==============================

##Overview

This module provides vue plugin for [@new-inventor/pluralization](https://github.com/new-inventor/pluralization) service.

Instead of `"zero | one | more"` notation, we provide endings notation.

## Installation

```shell script
npm install -S @new-inventor/vue-pluralization
# or
yarn add @new-inventor/vue-pluralization
```

Usage
---------

in main.ts/js 

```typescript
import PluralizationPlugin from '@new-inventor/vue-pluralization/PluralizationPlugin';
import ruWords from '@/ru.pluralization.json';
import {LocaleName} from "@new-inventor/pluralization/locales";
import RU, {RUWord} from "@new-inventor/pluralization/locales/RU";
import WordsList from "@new-inventor/pluralization/WordsList";

//...

Vue.use(PluralizationPlugin, {
  currentLocale: LocaleName.RU,
  locales: {
    [LocaleName.RU]: new RU(new WordsList<RUWord>(ruWords)),
  },
});
```

locales appears in next form: {<localeName>: <localeInstance>, ...} where instance must be child of `Locale` class

**You can use plain text** instead of `LocaleName.RU` to provide different locale or different locale name.

**You can extend `Locale` class** to implement your own locale. 

in templates (value = 2)

```html
<div>{{ value }} {{'билет' | pluralize(value, 'nominative')}}</div> -> 2 билета
// or
<div>{{ '{n} {билет|nominative}' | pluralizeTemplate(value)}}</div> -> 2 билета
```

in components

```typescript
this.$pluralizer.pluralize('билет', 1, RUModifier.DATIVE);
// or
this.$pluralizer.pluralizeTemplate('{n} {билет|nominative}', 1);
```

**You can pass plain text** to modifier parameter instead of `RUModifier.DATIVE`

pluralization config should provide object like this (for Russian):

```json
{
  "билет": {
    "base": "билет",
    "cases": {
      "nominative": ["", "а", "ов"],
      "genitive": ["а", "ов", "ов"],
      "dative": ["у", "ам", "ам"],
      "accusative": ["", "а", "ов"],
      "instrumental": ["ом", "ами", "ами"],
      "prepositional": ["е", "ах", "ах"]
    }
  },
  "подразделение": {
    "base": "подразделени",
    "cases": {
      "nominative": ["е", "я", "й"],
      "genitive": ["я", "й", "й"],
      "dative": ["ю", "ям", "ям"],
      "accusative": ["е", "я", "й"],
      "instrumental": ["ем", "ями", "ями"],
      "prepositional": ["е", "ях", "ях"]
    }
  }
}
```  

where the `key` of map is the name of word to pluralize (you pass it in the template or to pluralize function)

the `base` param is the unchanged part of word.

the `cases` param is the list of word modifiers with array of [1, 2, 5] variants of word ending

You should not provide this file for English language because there are strict rule for plural words.

When you will implement your own locale you should provide your own config file if it is needed.

Contribute
----------
Pull requests are always welcome.

Issues you can add here: https://github.com/new-inventor/vue-pluralization/issues

LICENCE
-------
MIT
