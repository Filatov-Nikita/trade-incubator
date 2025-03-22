<template>
  <div class="tw-relative">
    <q-img
      class="tw-w-[100px] tw-h-[100px] tw-rounded-2xl"
      :src="url"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    url: string,
  }>();
</script>
