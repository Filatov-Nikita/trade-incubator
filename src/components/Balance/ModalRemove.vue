<template>
  <q-dialog v-model="value">
    <q-card class="tw-bg-white">
      <q-card-section>
        <div class="tw-font-bold tw-text-lg">Вы действительно хотите отменить операцию?</div>
      </q-card-section>
      <q-card-actions>
        <q-btn color="negative" @click="send">Да</q-btn>
        <q-btn color="negative" flat @click="value = false">Нет</q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { Notify } from 'quasar';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';

  const props = defineProps<{
    operationId: number,
  }>();

  const emit = defineEmits<{
    (event: 'success'): void,
  }>();

  const value = defineModel<boolean>({ default: false });

  const api = useRepositories();
  const { send, loading } = usePostRequest(
    () => api.operations.remove(props.operationId),
    () => {},
    {
      onSuccess() {
        emit('success');
        value.value = false;
        Notify.create({
          type: 'positive',
          message: 'Операция успешно отменена',
        });
      },
      errorText: 'Не удалось отменить операцию!',
    },
  );
</script>
