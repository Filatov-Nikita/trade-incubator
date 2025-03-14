<template>
  <q-dialog v-model="value">
    <q-card class="tw-w-full tw-bg-white">
      <q-card-section>
        <div class="tw-font-bold tw-text-xl tw-mb-4">Выберите тип операции</div>
        <q-btn-group spread>
          <q-btn class="tw-bg-green-700 tw-text-white tw-py-5" label="Деньги" icon="payments" @click="$emit('change:type', 'cash')" />
          <q-btn class="tw-bg-blue-700 tw-text-white" label="Товары" icon="shopping_cart" @click="$emit('change:type', 'products')" />
        </q-btn-group>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { TransactionType } from 'src/repositories/operations';

  const value = defineModel<boolean>({ default: false });

  defineEmits<{
    (event: 'change:type', value: TransactionType): void,
  }>();
</script>
