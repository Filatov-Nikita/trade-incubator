<template>
  <q-form @submit="$emit('submit')">
    <CompaniesSelect
      class="tw-mb-2"
      v-model="form.company_id"
      :error="!!errors.company_id"
      :error-message="errors.company_id"
    />
    <q-select
      class="tw-mb-2"
      filled
      label="Тип оплаты"
      :options="paymentOptions"
      option-label="label"
      option-value="value"
      v-model="form.payment_source"
      emit-value
      map-options
      :error="!!errors.payment_source"
      :error-message="errors.payment_source"
    />
    <q-input
      class="tw-mb-2"
      filled
      label="Дата операции"
      type="date"
      v-model="form.date_from"
      :error="!!errors.date_from"
      :error-message="errors.date_from"
    />
    <q-input
      class="tw-mb-2"
      type="number"
      min="0"
      step="0.01"
      filled
      label="Сумма*"
      v-model="form.sum"
      :error="!!errors.sum"
      :error-message="errors.sum"
    />
    <q-input
      class="tw-mb-2"
      filled
      type="textarea"
      label="Комментарий"
      v-model="form.comment"
      :error="!!errors.comment"
      :error-message="errors.comment"
    />
    <PhotoUploader label="Фото" caption="максимум 10мб" v-model:uploaded-files="files" />
    <q-btn class="tw-mt-8" type="submit" color="primary">Отправить</q-btn>
  </q-form>
</template>

<script setup lang="ts">
  import PhotoUploader from 'src/components/Files/PhotoUploader/index.vue';
  import CompaniesSelect from 'src/components/Companies/Select.vue';
  import { FileItem } from 'src/repositories/files';
  import { OperationCashBody } from 'src/repositories/operations';

  defineProps<{
    form: Omit<OperationCashBody, 'type' | 'files'>,
    errors: Record<string, string>,
  }>();

  defineEmits<{
    (event: 'submit'): void,
  }>();

  const files = defineModel<FileItem[]>('files', { default: [] });

  const paymentOptions = [
    { label: 'Расчетный счет', value: 'checking-account' },
    { label: 'Самоинкассация', value: 'self-collection' },
  ];
</script>
