import PluralizationService from '@new-inventor/pluralization/Pluralization.service';
import {LocaleName} from '@new-inventor/pluralization/locales';
import Locale from '@new-inventor/pluralization/Locale';
import {PluginObject} from 'vue/types/plugin';
import {Vue as _Vue} from 'vue/types/vue';

export interface PluralizationOptions {
  currentLocale: string;
  locales: { [index: string]: Locale };
}

export class PluralizationPlugin implements PluginObject<PluralizationOptions> {
  public install(
    Vue: typeof _Vue,
    options: PluralizationOptions = {
      currentLocale: LocaleName.EN,
      locales: {}
    }
  ): void {
    const service = PluralizationService.make(options.currentLocale, options.locales);
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

export default new PluralizationPlugin();
