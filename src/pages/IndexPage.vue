<template>
  <q-page class="page-py">
    <div class="wrapper">
      <h1 class="h1 tw-mb-5">Мои операции</h1>
      <div class="tw-flex tw-flex-wrap tw-gap-3 tw-max-w-[200px] tw-mb-6">
        <q-btn class="tw-bg-orange-600 tw-text-white tw-w-full" @click="showedTypes = true; activeOperation = 'purchase'">
          Новая отгрузка
        </q-btn>
        <q-btn class="tw-bg-green-600 tw-text-white tw-w-full" @click="showedTypes = true; activeOperation = 'supply'">
          Новый приход
        </q-btn>
      </div>
      <ModalTypes
        v-model="showedTypes"
        @change:type="activeTransaction = $event; showedTypes = false; showedCreate = true"
      />
      <ModalCashCreate
        v-if="activeOperation && activeTransaction === 'cash'"
        :operationType="activeOperation"
        v-model="showedCreate"
        @success="balanceRef?.refresh()"
      />
      <ModalProductsCreate
        v-if="activeOperation && activeTransaction === 'products'"
        :operationType="activeOperation"
        v-model="showedCreate"
        @success="balanceRef?.refresh()"
      />
      <BalanceShow ref="balanceRef" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import ModalTypes from 'src/components/Operations/ModalTypes.vue';
  import ModalCashCreate from 'src/components/Operations/ModalCashCreate.vue';
  import ModalProductsCreate from 'src/components/Operations/ModalProductsCreate.vue';
  import BalanceShow from 'src/components/Balance/Show.vue';
  import { OperationType, TransactionType } from 'src/repositories/operations';
  import { ref } from 'vue';

  const showedTypes = ref(false);
  const showedCreate = ref(false);
  const activeTransaction = ref<TransactionType | null>(null);
  const activeOperation = ref<OperationType | null>(null);

  const balanceRef = ref<{ refresh: () => void } | null>(null);
</script>
