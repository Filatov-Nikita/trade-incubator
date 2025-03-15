<template>
  <q-card class="tw-sticky tw-top-2 tw-z-20">
    <q-card-section>
      <div class="tw-font-bold tw-text-base">
        <span>Баланс: </span>
        <span
          :class="{
            'tw-text-red-700': balance.balance < 0,
            'tw-text-green-700': balance.balance >= 0
            }"
          >
            {{ (balance.balance > 0 ? '+' : '-') + $amount(balance.balance) }}
          </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import type { BalanceData } from 'src/repositories/operations';

  defineProps<{
    balance: BalanceData,
  }>();
</script>
