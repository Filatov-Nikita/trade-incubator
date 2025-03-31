import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: 'home' },
      { path: '/products', component: () => import('pages/ProductsPage.vue'), name: 'products.index' },
      { path: '/companies', component: () => import('pages/CompaniesPage.vue'), name: 'companies.index' },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { guest: true },
    children: [
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
        name: 'auth.login',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
