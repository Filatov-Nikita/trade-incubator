<template>
  <FormAppend class="tw-mb-8" :items="items" @append="onAppend" />
  <List :items="items" @remove="onRemove" />
</template>

<script setup lang="ts">
  import FormAppend from 'src/components/Operations/Products/FormAppend.vue';
  import List from 'src/components/Operations/Products/List.vue';
  import type { ProductItem } from './model';

  const items = defineModel<ProductItem[]>('items', { default: [] });

  function onAppend(item: ProductItem) {
    items.value.push(item);
  }

  function onRemove(productId: number) {
    items.value = items.value.filter(item => item.product.id !== productId);
  }
</script>
