<template>
  <q-form @submit="$emit('submit')">
    <q-input
      class="tw-mb-2"
      filled
      label="Наименование*"
      v-model="form.name"
      :error="!!errors.name"
      :error-message="errors.name"
    />
    <q-input
      class="tw-mb-2"
      filled
      label="Телефон"
      v-model="form.phone"
      mask="+7 (###) ### ## ##"
      :error="!!errors.phone"
      :error-message="errors.phone"
    />
    <q-input
      class="tw-mb-2"
      filled
      label="Email"
      v-model="form.email"
      :error="!!errors.email"
      :error-message="errors.email"
    />
    <q-input
      filled
      type="textarea"
      label="Описание"
      v-model="form.description"
      :error="!!errors.description"
      :error-message="errors.description"
    />
    <q-btn class="tw-mt-4" type="submit" color="primary">Отправить</q-btn>
  </q-form>
</template>

<script setup lang="ts">
  import type { CompanyBody } from 'src/repositories/companies';

  defineProps<{
    form: CompanyBody,
    errors: Record<string, string>,
  }>();

  defineEmits<{
    (event: 'submit'): void,
  }>();
</script>
