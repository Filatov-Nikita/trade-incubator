<template>
  <div class="uploader">
    <div class="inp-label">{{ label }}</div>
    <div class="area">
      <div class="items">
        <PhotoPreview
          class="tw-shrink-0"
          v-for="file in uploadedFiles"
          :key="file.id"
          :url="file.url"
        />
        <FileInput class="tw-shrink-0" @change:file="onChnageFile" />
      </div>
    </div>
    <div class="caption" v-if="caption">{{ caption }}</div>
    <q-inner-loading :showing="loading" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import FileInput from './Input.vue';
  import PhotoPreview from './Preview.vue';
  import useRepositories from 'src/composables/useRepositories';
  import type { FileItem } from 'src/repositories/files';

  defineProps<{
    label: string,
    caption?: string,
  }>();

  const api = useRepositories();

  const { loading, send } = usePostRequest(
    api.files.upload,
    () => ({
      file: currentFile.value!,
    }),
    {
      onSuccess: (res) => {
        uploadedFiles.value.push(res.data.data);
      },
      errorText: 'Не удалось загрузить фото',
    }
  );

  const currentFile = ref<File | null>(null);
  const uploadedFiles = defineModel<FileItem[]>('uploadedFiles', {
    default: [],
  });

  function onChnageFile(file: File) {
    currentFile.value = file;
    send();
  }
</script>

<style scoped lang="scss">
  .inp-label {
    font-size: 18px;
    line-height: 1.3;
    font-weight: 700;
    @apply tw-mb-3;
  }

  .caption {
    margin-top: 10px;
    @apply tw-text-base tw-text-gray-500;
  }

  .items {
    display: flex;
    gap: 12px;
  }

  .area {
    max-width: 100%;
    overflow-y: hidden;
  }

  .uploader {
    position: relative;
  }
</style>
