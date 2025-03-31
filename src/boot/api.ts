import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import createProductsRepo from 'src/repositories/products';
import createCompaniesRepo from 'src/repositories/companies';
import createOperationsRepo from 'src/repositories/operations';
import createFilesRepo from 'src/repositories/files';
import createAuthRepo from 'src/repositories/auth';
import { InjectionKey } from 'vue';
import * as Token from 'src/utils/token';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $repositories: ReturnType<typeof createRepositories>,
    $http: AxiosInstance,
  }
}

export default defineBoot(({ app }) => {
  const http = createHttp();
  app.config.globalProperties['$http'] = http;
  app.provide(httpKey, http);

  const repositories = createRepositories(http);
  app.config.globalProperties['$repositories'] = repositories;
  app.provide(repositoriesKey, repositories);
});

export function createRepositories(http: AxiosInstance) {
  const repositories = {
    'products': createProductsRepo(http),
    'companies': createCompaniesRepo(http),
    'operations': createOperationsRepo(http),
    'files': createFilesRepo(http),
    'auth': createAuthRepo(http),
  };

  return repositories;
}

export function createHttp() {
  const http = axios.create({
    baseURL: process.env.API_BASE ?? '',
  });

  http.interceptors.request.use((config) => {
    const token = Token.get();

    if(!token) return config;

    config.headers.setAuthorization('Bearer ' + token);

    return config;
  });

  return http;
}

export const httpKey: InjectionKey<AxiosInstance> = Symbol();
export const repositoriesKey: InjectionKey<ReturnType<typeof createRepositories>> = Symbol();
