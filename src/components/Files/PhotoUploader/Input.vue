<template>
  <div
    class="tw-relative tw-w-[100px] tw-h-[100px] tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-bg-gray-100"
    v-ripple
  >
    <input
      class="tw-absolute tw-z-10 tw-w-full tw-h-full tw-left-0 tw-top-0 tw-opacity-0"
      type="file"
      accept="image/png, image/jpeg"
      @change="onChange"
    />
    <q-icon
      class="tw-text-gray-700"
      name="photo_camera"
      size="24px"
    />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (event: 'change:file', file: File): void,
  }>();

  function onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if(input.files && input.files[0]) {
      emit('change:file', input.files[0]);
    }
    input.value = '';
  }
</script>
