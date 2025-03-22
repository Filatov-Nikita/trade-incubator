<template>
  <q-dialog v-model="value">
    <q-card class="tw-w-full tw-bg-white">
      <q-card-section>
        <div class="tw-flex tw-items-center tw-gap-4 tw-mb-4">
          <div class="tw-text-xl tw-font-bold tw-grow">{{ title }}</div>
          <q-btn flat round icon="close" @click="value = false" />
        </div>
        <FormCash v-if="operation" :form="form" v-model:files="files" :errors="errors" @submit="update" />
        <q-inner-loading :showing="loadingOne || updating"></q-inner-loading>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRequest from 'src/composables/useRequest';
  import FormCash from 'src/components/Operations/FormCash.vue';
  import { FileItem } from 'src/repositories/files';
  import { OperationCashBody } from 'src/repositories/operations';
  import { computed, reactive, ref } from 'vue';
  import { Notify } from 'quasar';
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
        form.sum = res.data.sum;
        form.company_id = res.data.company.id;
        form.comment = res.data.comment;
        form.payment_source = res.data.payment_source;
        form.date_from = res.data.date_from;
        files.value = res.data.files;
      },
      watch: [ () => props.operationId ],
    },
  );

  const files = ref<FileItem[]>([]);

  const form: Omit<OperationCashBody, 'type' | 'files'> = reactive({
    sum: '',
    company_id: '',
    comment: '',
    payment_source: 'checking-account',
    date_from: '',
  });

  const { send: update, loading: updating, errors } = usePostRequest(
    () => api.operations.updateCash(props.operationId, {
      files: files.value.map(f => f.id),
      ...form,
    }),
    () => {},
    {
      isForm: true,
      errorText: 'Не удалось обновить операцию!',
      onSuccess() {
        value.value = false;
        emit('success');
        Notify.create({ type: 'positive', message: 'Операция успешно обновлена!' });
      },
    }
  );

  const { prettyDateOnly } = usePrettyDate();

  const title = computed(() => {
    if(!operation.value) return '';
    const type = operation.value.data.type === 'purchase' ? 'Отгрузка' : 'Приход';
    const dt = prettyDateOnly(operation.value.data.date_from);
    return `${type} №${operation.value.data.id} от ${dt}`;
  });
</script>
