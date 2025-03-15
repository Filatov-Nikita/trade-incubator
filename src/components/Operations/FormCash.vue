<template>
  <q-form @submit="$emit('submit')">
    <CompaniesSelect
      class="tw-mb-2"
      v-model="form.company_id"
      :error="!!errors.company_id"
      :error-message="errors.company_id"
    />
    <q-input
      class="tw-mb-2"
      type="number"
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
</script>
