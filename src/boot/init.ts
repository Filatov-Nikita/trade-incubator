import { boot } from "quasar/wrappers";
import prettyAmount from 'src/plugins/pretty-amount';

export default boot(({ app }) => {
  app.use(prettyAmount);
});
