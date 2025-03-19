import { createApp } from 'vue';
import { prettyDateShort, prettyDateOnly, prettyDate } from 'src/composables/usePrettyDate';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $prettyDateShort: typeof prettyDateShort;
    $prettyDateOnly: typeof prettyDateOnly;
    $prettyDate: typeof prettyDate;
  }
}

export default {
  install(app: ReturnType<typeof createApp>) {
    app.config.globalProperties.$prettyDateShort = prettyDateShort;
    app.config.globalProperties.$prettyDateOnly = prettyDateOnly;
    app.config.globalProperties.$prettyDate = prettyDate;
  }
}
