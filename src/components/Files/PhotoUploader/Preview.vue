<template>
  <div class="preview">
    <img class="photo" :src="url" />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    url: string,
  }>();
</script>

<style scoped lang="scss">
  .preview {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
  }

  .photo {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
</style>
