<template>
  <q-markup-table class="balance">
    <thead>
      <tr>
        <th class="tw-text-left !tw-text-base !tw-font-bold">ID</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Поставщик</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Дата</th>
        <!-- <th class="tw-text-left !tw-text-base !tw-font-bold">Тип</th> -->
        <th class="tw-text-left !tw-text-base !tw-font-bold">Оплата</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">Состав</th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">
          <span class="tw-block">Приход</span>
          <span class="tw-block tw-text-green-700 tw-text-xs">+{{ $amount(balance.income_total) }}</span>
        </th>
        <th class="tw-text-left !tw-text-base !tw-font-bold">
          <span class="tw-block">Расход</span>
          <span class="tw-block tw-text-red-700 tw-text-xs">-{{ $amount(balance.outcome_total) }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="operation in balance.operations"
        class="tw-cursor-pointer"
        :class="{
          'tw-bg-green-50': operation.type === 'supply',
          'tw-bg-red-50': operation.type === 'purchase',
        }"
        @click="$emit('operation:show', operation)"
      >
        <td class="tw-font-bold">{{ operation.id }}</td>
        <td>
          <p class="tw-font-bold">{{ operation.company.name }}</p>
          <p class="tw-mt-1" v-if="operation.company.phone">
            <a class="tw-text-blue-700" :href="`tel:${operation.company.phone}`" @click.stop>{{ operation.company.phone }}</a>
          </p>
          <p class="tw-mt-1" v-if="operation.company.email">
            <a class="tw-text-blue-700" :href="`mailto:${operation.company.email}`" @click.stop>{{ operation.company.email }}</a>
          </p>
        </td>
        <td>{{ $prettyDate(operation.date_from) }}</td>
        <!-- <td>
          {{ operation.transaction_type === 'cash' ? 'Деньги' : 'Товары' }}
        </td> -->
        <td>
          {{
            operation.payment_source === 'checking-account'
            ? 'Расчетный счет'
            : operation.payment_source === 'self-collection' ? 'Самоинкассация'
            : 'Продукты'
          }}
        </td>
        <td class="tw-space-y-2 tw-text-xs">
          <template v-if="operation.transaction_type === 'products'">
            <div v-for="product in operation.products">
              <p>{{ product.name }}</p>
              <p>Цена: {{ $amount(product.price) }}</p>
              <p>Количество: {{ $formatValue(product.count) }}</p>
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
  import type { BalanceData, OperationRow } from 'src/repositories/operations';

  defineProps<{
    balance: BalanceData,
  }>();

  defineEmits<{
    (event: 'operation:show', operation: OperationRow): void,
  }>();
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
