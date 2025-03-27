<template>
  <Filter id="filter" class="tw-mb-8" :filter="filter" @apply="send" @reset="resetFilter" />
  <template v-if="operations">
    <Result id="result" class="tw-mb-4" :balance="operations.data" />
    <Table id="balance" :balance="operations.data" @operation:show="activeOperation = $event; showed = true" />
    <template v-if="activeOperation">
      <ModalOne
        ref="modalOneRef"
        v-model="showed"
        :operationId="activeOperation.id"
        @remove="showedRemove = true"
        @update="showedUpdate = true;"
      />
      <ModalRemove
        v-model="showedRemove"
        :operationId="activeOperation.id"
        @success="send(); showed = false"
      />
      <ModalCashUpdate
        v-if="activeOperation.transaction_type === 'cash'"
        v-model="showedUpdate"
        :operationId="activeOperation.id"
        @success="send(); showedUpdate = false; modalOneRef?.refresh()"
      />
      <ModalProductsUpdate
        v-if="activeOperation.transaction_type === 'products'"
        v-model="showedUpdate"
        :operationId="activeOperation.id"
        @success="send(); showedUpdate = false; modalOneRef?.refresh()"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
  import Filter from 'src/components/Balance/Filter.vue';
  import Table from 'src/components/Balance/Table.vue';
  import Result from 'src/components/Balance/Result.vue';
  import ModalOne from 'src/components/Balance/ModalOne.vue';
  import ModalRemove from 'src/components/Balance/ModalRemove.vue';
  import ModalCashUpdate from 'src/components/Operations/ModalCashUpdate.vue';
  import ModalProductsUpdate from 'src/components/Operations/ModalProductsUpdate.vue';
  import { reactive, ref } from 'vue';
  import { BalanceParams, OperationRow } from 'src/repositories/operations';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';

  const filter: BalanceParams = reactive(initFilter());

  const api = useRepositories();
  const { data: operations, loading, send } = useRequest(
    () => api.operations.balance(filter),
    {
      errorText: 'Не удалось загрузить баланс!',
    }
  );

  function initFilter(): BalanceParams {
    const currentYear = new Date().getFullYear();
    return {
      date_from: new Date(`${currentYear}-01-01`).toISOString().split('T')[0]!,
      date_to: new Date(`${currentYear}-12-31`).toISOString().split('T')[0]!,
      company: '',
    };
  }

  function resetFilter() {
    Object.assign(filter, initFilter());
  }

  const showed = ref(false);
  const showedRemove = ref(false);
  const showedUpdate = ref(false);
  const activeOperation = ref<OperationRow | null>(null);

  const modalOneRef = ref<any>(null);

  defineExpose({
    refresh: send,
  });
</script>

<style lang="scss">
  @media print {
    #balance {
      table {
        border: 1px solid black !important;

        td, th {
          color: black;
          background: white !important;
          border: 1px solid black !important;
        }

        td:last-child {
          @apply tw-text-red-700 !important;
        }

        td:nth-last-child(2) {
          @apply tw-text-green-700 !important;
        }

        tr {
          page-break-inside: avoid;
        }

        thead {
          display: table-header-group;
        }
      }
    }

    #result, .q-markup-table {
      box-shadow: none !important;
    }

    #result {
      position: static !important;
      border: 2px solid black !important;
    }

    #filter {
      display: none !important;
    }
  }
</style>
