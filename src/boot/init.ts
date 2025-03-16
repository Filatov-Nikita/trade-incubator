import { boot } from "quasar/wrappers";
import prettyAmount from 'src/plugins/pretty-amount';
import prettyDate from 'src/plugins/pretty-date';

export default boot(({ app }) => {
  app.use(prettyAmount);
  app.use(prettyDate);
});
