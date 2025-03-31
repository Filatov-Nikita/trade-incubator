import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';

export default boot(({ router }) => {
  const authStore = useAuthStore();
  router.beforeEach((to, from, next) => {
    if(to.meta.auth && !authStore.user) {
      return next('/login');
    } else if(to.meta.guest && authStore.user) {
      return next('/');
    } else {
      next();
    }
  });
});
