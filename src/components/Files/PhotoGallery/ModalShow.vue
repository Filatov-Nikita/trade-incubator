<template>
  <q-dialog class="modal-photo-show" v-model="value">
    <q-card class="!tw-bg-transparent !tw-h-full !tw-max-w-full !tw-w-full" flat>
      <q-btn class="tw-absolute tw-top-0 tw-right-0 tw-z-50" color="white" dense round flat icon="close" size="lg" @click="value = false" />
      <q-carousel
        class="!tw-bg-transparent !tw-h-full !tw-max-w-full !tw-w-full slider"
        animated
        swipeable
        v-model="active"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide
          v-for="(item, index) in items"
          :key="item.id"
          :name="index"
        >
          <img class="tw-w-full tw-h-full tw-object-contain" :src="item.url" draggable="false" />
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import type { FileItem } from 'src/repositories/files';

  defineProps<{
    items: FileItem[],
  }>();

  const value = defineModel<boolean>({ default: false });
  const active = defineModel<number>('activeIndex', { default: 0 });
</script>

<style>
  .modal-photo-show .q-dialog__backdrop {
    background: rgba(0, 0, 0, 0.95) !important;
  }
</style>

<style scoped>
  .slider :deep(.q-carousel__arrow .q-icon) {
    font-size: 40px !important;
  }
</style>
