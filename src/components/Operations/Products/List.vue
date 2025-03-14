<template>
  <q-banner v-if="items.length === 0" rounded class="tw-text-base tw-bg-yellow-400 tw-text-black bg">
    Добавьте хотя бы один продукт
    <template v-slot:avatar>
      <q-icon name="info" class=" tw-text-yellow-700" />
    </template>
  </q-banner>
  <q-list v-else bordered separator>
    <q-item v-for="item in items" :key="item.product.id">
      <q-item-section>
        <q-item-label>
          Наименование: {{ item.product.name }}
        </q-item-label>
        <q-item-label>
          Цена: {{ item.price }}
        </q-item-label>
        <q-item-label>
          Количество: {{ item.count }}
        </q-item-label>
        <q-item-label>
          Итого: {{ calcTotal(item)}}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="actions">
          <q-btn size="sm" color="negative" round icon="delete" @click="emit('remove', item.product.id)"></q-btn>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
  import type { ProductItem } from '../FormProductsSteps/model';

  defineProps<{
    items: ProductItem[],
  }>();

  const emit = defineEmits<{
    (event: 'remove', productId: number): void,
  }>();

  function calcTotal(item: ProductItem) {
    return parseInt(item.count.toString()) * parseFloat(item.price.toString());
  }
</script>

<style scoped lang="scss">
  .actions {
    display: flex;
    gap: 12px;
  }
</style>
