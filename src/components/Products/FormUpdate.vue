<template>
  <q-form @submit="$emit('submit')">
    <q-input
      filled
      label="Наименование"
      v-model="form.name"
      :error="!!errors.name"
      :error-message="errors.name"
    />
    <q-btn class="tw-mt-4" type="submit" color="primary">Отправить</q-btn>
  </q-form>
</template>

<script setup lang="ts">
  import type { ProductBody } from 'src/repositories/products';

  defineProps<{
    form: ProductBody,
    errors: Record<string, string>,
  }>();

  defineEmits<{
    (event: 'submit'): void,
  }>();
</script>
