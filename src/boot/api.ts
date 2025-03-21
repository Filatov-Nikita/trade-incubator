import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import createProductsRepo from 'src/repositories/products';
import createCompaniesRepo from 'src/repositories/companies';
import createOperationsRepo from 'src/repositories/operations';
import createFilesRepo from 'src/repositories/files';
import { InjectionKey } from 'vue';

declare module 'vue' {
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
  };

  return repositories;
}

export function createHttp() {
  const http = axios.create({
    baseURL: process.env.API_BASE ?? '',
  });

  return http;
}

export const httpKey: InjectionKey<AxiosInstance> = Symbol();
export const repositoriesKey: InjectionKey<ReturnType<typeof createRepositories>> = Symbol();
