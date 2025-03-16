<template>
  <div class="item">
    <img class="img" :src="url" />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    url: string,
  }>();
</script>

<style scoped lang="scss">
  .item {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
