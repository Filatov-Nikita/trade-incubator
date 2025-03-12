import { ref, reactive, watch } from 'vue';
import { Notify } from 'quasar';
import { AxiosError } from 'axios';

type ErrorResponse = {
  message: string,
  errors: Record<string, string[]>,
};

export interface Options<T extends (...args: any) => any> {
  onSuccess?: (res: Awaited<ReturnType<T>>) => void,
  onFailed?: (e: AxiosError) => void,
  errorText?: string,
  isForm?: boolean,
}

export default function<K, T extends (body: K) => Promise<any>>(
  fetchFn: T,
  getBody: () => K,
  options: Options<T> = {},
) {
  const loading = ref(false);
  const error = ref<unknown | null>(null);
  const errors: Record<string, string> = reactive({});

  async function send() {
    try {
      clearErrors();
      error.value = null;
      loading.value = true;
      const res = await fetchFn(getBody());
      if(options.onSuccess) options.onSuccess(res);
      return res;
    } catch(e) {
      error.value = e;
      handleError(e);
      if(e instanceof AxiosError && options.onFailed) options.onFailed(e);
    } finally {
      loading.value = false;
    }
  }

  function clearErrors() {
    for(let key in errors) {
      delete errors[key];
    }
  }

  function showError() {
    if(options.errorText) {
      Notify.create({ type: 'negative', message: options.errorText });
    }
  }

  function handleError(e: unknown) {
    if(options.isForm && e instanceof AxiosError && e.response && e.response.status === 422) {
      const data = e.response.data as ErrorResponse;
      for(let key in data.errors) {
        if(data.errors[key] && data.errors[key][0]) {
          errors[key] = data.errors[key][0];
        }
      }
    } else {
      showError();
    }
  }

  return {
    loading,
    error,
    errors,
    send,
  }
}
