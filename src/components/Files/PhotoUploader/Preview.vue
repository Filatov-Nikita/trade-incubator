<template>
  <div class="tw-relative">
    <q-img class="tw-w-[100px] tw-h-[100px] tw-rounded-2xl" :src="file.url" />
    <q-btn
      class="tw-absolute tw-top-0 tw-right-0 tw-z-10 tw-bg-white tw-text-red-700"
      flat
      dense
      round
      icon="close"
      size="xs"
      @click="$emit('remove', file.id)"
    />
  </div>
</template>

<script setup lang="ts">
  import type { FileItem } from 'src/repositories/files';

  defineProps<{
    file: FileItem,
  }>();

  defineEmits<{
    (event: 'remove', id: number): void,
  }>();
</script>
