<template>
  <q-select
    filled
    use-input
    label="Компания"
    v-model="companyId"
    :options="options"
    :option-label="'name'"
    :option-value="'id'"
    emit-value
    map-options
    :loading="loading"
    :error="error"
    :error-message="errorMessage"
    @filter="filterFn">
  </q-select>
</template>

<script setup lang="ts">
  import { CompanyListItem } from 'src/repositories/companies';
  import { QSelectProps } from 'quasar';
  import { ref } from 'vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';

  defineProps<{
    error?: boolean,
    errorMessage?: string | undefined,
  }>();

  const companyId = defineModel();

  const api = useRepositories();

  const options = ref<CompanyListItem[]>([]);

  const { data: companies, loading } = useRequest(
    api.companies.list, {
      onSuccess({ data: res }) {
        options.value = res.data;
      }
    }
  );

  const filterFn: QSelectProps['onFilter'] = (val, update) => {
    update(() => {
      const needle = val.toLowerCase();
      if(companies.value) {
        options.value = companies.value.data.filter(v => v.name.toLowerCase().indexOf(needle) > -1);
      }
    })
  }
</script>
