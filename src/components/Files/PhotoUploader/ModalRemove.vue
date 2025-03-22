<template>
  <q-dialog v-model="value">
    <q-card class="tw-bg-white">
      <q-card-section>
        <div class="tw-font-bold tw-text-lg">Вы действительно хотите удалить файл?</div>
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
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';

  const props = defineProps<{
    fileId: number,
  }>();

  const emit = defineEmits<{
    (event: 'success', fileId: number): void,
  }>();

  const value = defineModel<boolean>({ default: false });

  const api = useRepositories();

  const { loading, send } = usePostRequest(
    () => api.files.remove(props.fileId),
    () => {},
    {
      errorText: 'Не удалось удалить файл',
      onSuccess() {
        emit('success', props.fileId);
        value.value = false;
      },
    }
  )
</script>
