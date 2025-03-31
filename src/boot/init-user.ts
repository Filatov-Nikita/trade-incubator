import { boot } from "quasar/wrappers";
import { AxiosError } from 'axios';
import { useAuthStore } from 'src/stores/auth';
import { Loading } from 'quasar';
import * as Token from 'src/utils/token';

export default boot(async ({ app }) => {
  const api = app.config.globalProperties.$repositories;
  const authStore = useAuthStore();

  try {
    Loading.show();
    const { data: res } = await api.auth.showUser();
    authStore.setUser(res.data);
  } catch(e) {
    const message = 'Не удалось загрузить пользователя.';

    if(e instanceof AxiosError) {
      if(e.status === 401) {
        Token.remove();
      } else {
        console.log(message);
      }
    } else {
      console.log(message);
    }

    authStore.setUser(null);
  } finally {
    Loading.hide();
  }
});
