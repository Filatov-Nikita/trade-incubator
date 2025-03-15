<template>
  <q-dialog v-model="value">
    <q-card class="tw-w-full tw-bg-white">
      <q-card-section>
        <div class="tw-flex tw-items-center tw-gap-4 tw-mb-4">
          <div class="tw-text-xl tw-font-bold tw-grow">
            {{ operationType === 'purchase' ? 'Новая отгрузка' : 'Новый приход' }}
          </div>
          <q-btn flat round icon="close" @click="value = false" />
        </div>
        <q-stepper
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
        <q-inner-loading :showing="loading"></q-inner-loading>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import StepProducts from './FormProductsSteps/StepProducts.vue';
  import StepData from './FormProductsSteps/StepData.vue';
  import { OperationType, OperationProductsBody } from 'src/repositories/operations';
  import { FileItem } from 'src/repositories/files';
  import { reactive, ref } from 'vue';
  import { Notify, type QStepper } from 'quasar';
  import type { ProductItem } from './FormProductsSteps/model';

  const props = defineProps<{
    operationType: OperationType,
  }>();

  const emit = defineEmits<{
    (event: 'success'): void,
  }>();

  const value = defineModel<boolean>({ default: false });

  const files = ref<FileItem[]>([]);

  const products = ref<ProductItem[]>([]);

  const form: Omit<OperationProductsBody, 'type' | 'files' | 'products'> = reactive({
    company_id: '',
    comment: '',
  });

  const api = useRepositories();
  const { send, loading, errors } = usePostRequest(
    api.operations.createProducts,
    () => ({
      type: props.operationType,
      files: files.value.map(f => f.id),
      products: products.value.map(p => ({ count: p.count, price: p.price, id: p.product.id })),
      ...form,
    }),
    {
      isForm: true,
      errorText: 'Не удалось завершить операцию!',
      onSuccess() {
        value.value = false;
        resetForms();
        emit('success');
        Notify.create({ type: 'positive', message: 'Операция успешно создана!' });
      },
    }
  );

  const activeStep = ref(0);
  const stepperRef = ref<QStepper | null>(null);

  function resetForms() {
    form.company_id = '';
    form.comment = '';
    files.value = [];
    activeStep.value = 0;
    products.value = [];
  }
</script>
