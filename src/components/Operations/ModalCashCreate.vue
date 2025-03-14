<template>
  <q-dialog v-model="value">
    <q-card class="tw-w-full tw-bg-white">
      <q-card-section>
        <div class="tw-flex tw-items-center tw-gap-4">
          <div class="tw-text-xl tw-font-bold tw-grow">
            {{ operationType === 'purchase' ? 'Новая отгрузка' : 'Новый приход' }}
          </div>
          <q-btn flat round icon="close" @click="value = false" />
        </div>
        <FormCash :form="form" :errors="errors" :files="files" @submit="send" />
        <q-inner-loading :showing="loading"></q-inner-loading>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { OperationType, OperationCashBody } from 'src/repositories/operations';
  import { FileItem } from 'src/repositories/files';
  import { reactive, ref } from 'vue';
  import { Notify } from 'quasar';
  import FormCash from './FormCash.vue';

  const props = defineProps<{
    operationType: OperationType,
  }>();

  const value = defineModel<boolean>({ default: false });

  const files = ref<FileItem[]>([]);

  const form: Omit<OperationCashBody, 'type' | 'files'> = reactive({
    sum: '',
    company_id: '',
    comment: '',
  });

  function resetForm() {
    form.sum = '';
    form.company_id = '';
    form.comment = '';
    files.value = [];
  }

  const api = useRepositories();
  const { send, loading, errors } = usePostRequest(
    api.operations.createCash,
    () => ({
      type: props.operationType,
      files: files.value.map(f => f.id),
      ...form,
    }),
    {
      isForm: true,
      errorText: 'Не удалось завершить операцию!',
      onSuccess() {
        value.value = false;
        resetForm();
        Notify.create({ type: 'positive', message: 'Операция успешно создана!' });
      },
    }
  );
</script>
