<template>
  <q-markup-table class="balance">
    <thead>
      <tr>
        <th class="tw-text-left !tw-text-base !tw-font-bold">ID</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Поставщик</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Дата</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Тип</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Состав</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Приход</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Расход</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="operation in balance.operations"
        :class="{
          'tw-bg-green-50': operation.type === 'supply',
          'tw-bg-red-50': operation.type === 'purchase',
        }"
      >
        <td class="tw-font-bold">{{ operation.id }}</td>
        <td>
          <p class="tw-font-bold">{{ operation.company.name }}</p>
          <p class="tw-mt-1" v-if="operation.company.phone">
            <a class="tw-text-blue-700" :href="`tel:${operation.company.phone}`">{{ operation.company.phone }}</a>
          </p>
          <p class="tw-mt-1" v-if="operation.company.email">
            <a class="tw-text-blue-700" :href="`mailto:${operation.company.email}`">{{ operation.company.email }}</a>
          </p>
        </td>
        <td>{{ prettyDate(operation.created_at) }}</td>
        <td>
          {{ operation.transaction_type === 'cash' ? 'Деньги' : 'Товары' }}
        </td>
        <td class="tw-space-y-2 tw-text-xs">
          <template v-if="operation.transaction_type === 'products'">
            <div v-for="product in operation.products">
              <p>{{ product.name }}</p>
              <p>Цена: {{ $amount(product.price) }}</p>
              <p>Количество: {{ product.count }}</p>
              <p>Сумма: {{ $amount(product.price * product.count) }}</p>
            </div>
          </template>
        </td>
        <td class="!tw-bg-green-700 tw-text-white tw-font-bold">
          {{ operation.type === 'supply' ? '+' + $amount(operation.sum) : '' }}
        </td>
        <td class="!tw-bg-red-700 tw-text-white tw-font-bold">
          {{ operation.type === 'purchase' ? '-' + $amount(operation.sum) : '' }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup lang="ts">
  import type { BalanceData } from 'src/repositories/operations';

  defineProps<{
    balance: BalanceData,
  }>();

  function prettyDate(str: string) {
    return new Date(str).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
</script>


<style scoped lang="scss">
  .balance {
    th:nth-child(2) {
      position: sticky;
      z-index: 10;
      left: 0;
      @apply tw-bg-white;
    }
    tr {
      td:nth-child(2) {
        position: sticky;
        z-index: 10;
        left: 0;
      }
    }
  }
</style>
