<template>
  <q-select
    filled
    use-input
    label="Товар"
    v-model="product"
    :options="options"
    :option-disable="isDisabled"
    :option-label="'name'"
    :rules="rules"
    @filter="filterFn"
  >
  </q-select>
</template>

<script setup lang="ts">
  import { QSelectProps, ValidationRule } from 'quasar';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import type { ProductListItem } from 'src/repositories/products';
  import { ref } from 'vue';

  const props = defineProps<{
    disabledIds?: (number | string)[],
    rules: ValidationRule[],
  }>();

  const product = defineModel<ProductListItem | null>();

  const api = useRepositories();

  const options = ref<ProductListItem[]>([]);

  const { data: products } = useRequest(
    api.products.list,
    {
      onSuccess({ data: res }) {
        options.value = res.data
      },
    }
  );

  const isDisabled = (opt: ProductListItem) => {
    if(!props.disabledIds) return false;
    return props.disabledIds.includes(opt.id);
  }

  const filterFn: QSelectProps['onFilter'] = (val, update) => {
    update(() => {
      const needle = val.toLowerCase();
      if(!products.value) {
        options.value = []
      } else {
        options.value = products.value.data.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      }
    })
  }
</script>
