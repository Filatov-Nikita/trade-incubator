<template>
  <q-form>
    <CompaniesSelect
      class="tw-mb-2"
      v-model="form.company_id"
      :error="!!errors.company_id"
      :error-message="errors.company_id"
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
  </q-form>
</template>

<script setup lang="ts">
  import PhotoUploader from 'src/components/Files/PhotoUploader/index.vue';
  import CompaniesSelect from 'src/components/Companies/Select.vue';
  import { FileItem } from 'src/repositories/files';
  import { OperationProductsBody } from 'src/repositories/operations';

  defineProps<{
    form: Omit<OperationProductsBody, 'type' | 'files' | 'products'>,
    errors: Record<string, string>,
  }>();

  const files = defineModel<FileItem[]>('files', { default: [] });
</script>
