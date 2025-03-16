<template>
  <Filter class="tw-mb-8" :filter="filter" @apply="send" @reset="resetFilter" />
  <template v-if="operations">
    <Result class="tw-mb-4" :balance="operations.data" />
    <Table :balance="operations.data" @operation:show="activeOperation = $event; showed = true" />
    <ModalOne v-if="activeOperation" v-model="showed" :operationId="activeOperation" />
  </template>
</template>

<script setup lang="ts">
  import Filter from 'src/components/Balance/Filter.vue';
  import Table from 'src/components/Balance/Table.vue';
  import Result from 'src/components/Balance/Result.vue';
  import ModalOne from 'src/components/Balance/ModalOne.vue';
  import { reactive, ref } from 'vue';
  import { BalanceParams } from 'src/repositories/operations';
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
  const activeOperation = ref<number | null>(null);

  defineExpose({
    refresh: send,
  });
</script>
