<template>
  <q-dialog v-model="value">
    <q-card class="card-modal">
      <q-card-section>
        <div class="tw-flex tw-items-center tw-gap-4">
          <div class="tw-text-xl tw-font-bold tw-grow">Обновить продукт</div>
          <q-btn flat round icon="close" @click="value = false" />
        </div>
        <FormUpdate :form="form" :errors="errors" @submit="send" />
        <q-inner-loading :showing="loading || loadingProduct" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import FormUpdate from 'src/components/Products/FormUpdate.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { reactive } from 'vue';
  import type { ProductBody } from 'src/repositories/products';
  import { Notify } from 'quasar';
  import useRequest from 'src/composables/useRequest';

  const props = defineProps<{
    productId: number,
  }>();

  const emit = defineEmits<{
    (event: 'success'): void,
  }>();

  const value = defineModel<boolean>({ default: false });

  const api = useRepositories();

  const form: ProductBody = reactive({
    name: '',
  });

   const { loading: loadingProduct } = useRequest(
    () => api.products.show(props.productId),
    {
      onSuccess({ data: res }) {
        form.name = res.data.name;
      },
      errorText: 'Не удалось загрузить продукт',
      watch: [ () => props.productId ],
    }
  );

  const { send, loading, errors } = usePostRequest(
    () => api.products.update(props.productId, { name: form.name }),
    () => {},
    {
      isForm: true,
      errorText: 'Не удалось создать продукт!',
      onSuccess() {
        value.value = false;
        form.name = '';
        emit('success');
        Notify.create({ type: 'positive', message: 'Продукт успешно создан!' });
      }
    }
  );
</script>
