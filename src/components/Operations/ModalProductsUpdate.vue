<template>
  <q-dialog v-model="value">
    <q-card class="tw-w-full tw-bg-white">
      <q-card-section>
        <div class="tw-flex tw-items-center tw-gap-4 tw-mb-4">
          <div class="tw-text-xl tw-font-bold tw-grow">
            {{ title }}
          </div>
          <q-btn flat round icon="close" @click="value = false" />
        </div>
        <q-stepper
          v-if="operation"
          v-model="activeStep"
          ref="stepperRef"
          color="primary"
          animated
          flat
          bordered
        >
          <q-step
            :name="0"
            title="Продукты"
            icon="shopping_cart"
            :done="activeStep > 0"
          >
            <StepProducts v-model:items="products" />
          </q-step>
          <q-step
            :name="1"
            title="Данные"
            icon="edit_document"
          >
            <StepData :form="form" :errors="errors" v-model:files="files" />
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="activeStep === 1" @click="send" color="primary" label="Отправить" />
              <q-btn v-if="activeStep < 1" @click="stepperRef?.next()" color="primary" label="Далее" :disable="products.length === 0" />
              <q-btn v-if="activeStep > 0" flat color="primary" @click="stepperRef?.previous()" label="Назад" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <q-inner-loading :showing="loadingOne || loading"></q-inner-loading>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import StepProducts from './FormProductsSteps/StepProducts.vue';
  import StepData from './FormProductsSteps/StepData.vue';
  import { OperationProductsBody } from 'src/repositories/operations';
  import { FileItem } from 'src/repositories/files';
  import { reactive, ref, computed } from 'vue';
  import { Notify, type QStepper } from 'quasar';
  import type { ProductItem } from './FormProductsSteps/model';
  import usePrettyDate from 'src/composables/usePrettyDate';

  const props = defineProps<{
    operationId: number,
  }>();

  const emit = defineEmits<{
    (event: 'success'): void,
  }>();

  const value = defineModel<boolean>({ default: false });

  const api = useRepositories();

  const { data: operation, loading: loadingOne } = useRequest(
    () => api.operations.show(props.operationId),
    {
      onSuccess({ data: res }) {
        form.company_id = res.data.company.id;
        form.comment = res.data.comment;
        form.date_from = res.data.date_from;
        files.value = res.data.files;
        products.value = res.data.products.map(p => ({
          product: { id: p.id, name: p.name }, price: p.price, count: p.count,
        }));
      },
      watch: [ () => props.operationId ],
    },
  );

  const files = ref<FileItem[]>([]);

  const products = ref<ProductItem[]>([]);

  const form: Omit<OperationProductsBody, 'type' | 'files' | 'products'> = reactive({
    company_id: '',
    comment: '',
    date_from: '',
  });

  const { send, loading, errors } = usePostRequest(
    () => api.operations.updateProducts(props.operationId, {
      files: files.value.map(f => f.id),
      products: products.value.map(p => ({ count: p.count, price: p.price, id: p.product.id })),
      ...form,
    }),
    () => {},
    {
      isForm: true,
      errorText: 'Не удалось обновить операцию!',
      onSuccess() {
        value.value = false;
        activeStep.value = 0;
        emit('success');
        Notify.create({ type: 'positive', message: 'Операция успешно обновлена!' });
      },
    }
  );

  const activeStep = ref(0);
  const stepperRef = ref<QStepper | null>(null);

  const { prettyDateOnly } = usePrettyDate();

  const title = computed(() => {
    if(!operation.value) return '';
    const type = operation.value.data.type === 'purchase' ? 'Отгрузка' : 'Приход';
    const dt = prettyDateOnly(operation.value.data.date_from);
    return `${type} №${operation.value.data.id} от ${dt}`;
  });
</script>
