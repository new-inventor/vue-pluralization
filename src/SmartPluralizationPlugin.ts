import SmartPluralizationService from '@new-inventor/smart-pluralization/SmartPluralization.service';
import {LocaleName} from '@new-inventor/smart-pluralization/locales';
import Locale from '@new-inventor/smart-pluralization/Locale';
import {PluginObject} from 'vue/types/plugin';
import {Vue as _Vue} from 'vue/types/vue';

export interface SmartPluralizationOptions {
  currentLocale: string;
  locales: { [index: string]: Locale };
}

export default class SmartPluralizationPlugin implements PluginObject<SmartPluralizationOptions> {
  public install(
    Vue: typeof _Vue,
    options: SmartPluralizationOptions = {
      currentLocale: LocaleName.EN,
      locales: {}
    }
  ): void {
    const service = SmartPluralizationService.make(options.currentLocale, options.locales);
    Vue.mixin({
      data: () => {
        return {
          $pluralizer: service,
        };
      },
    });
    Vue.filter('pluralizeTemplate', service.pluralizeTemplate);
    Vue.filter('pluralize', service.pluralize);
  }
}
