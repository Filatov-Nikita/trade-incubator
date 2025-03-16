<template>
  <div class="area">
    <div class="items">
      <Preview
        class="photo"
        v-for="(item, index) in items"
        :url="item.url"
        @click="showed = true; activeIndex = index"
      />
    </div>
    <ModalShow v-model="showed" v-model:activeIndex="activeIndex" :items="items" />
  </div>
</template>

<script setup lang="ts">
  import type { FileItem } from 'src/repositories/files';
  import Preview from './Preview.vue';
  import ModalShow from './ModalShow.vue';
  import { ref } from 'vue';

  defineProps<{
    items: FileItem[],
  }>();

  const showed = ref(false);
  const activeIndex = ref(0);
</script>

<style scoped lang="scss">
  .area {
    max-width: 100%;
    overflow-y: hidden;
  }

  .items {
    display: flex;
    gap: 10px;
  }

  .photo {
    cursor: pointer;
    flex-shrink: 0;
  }
</style>
