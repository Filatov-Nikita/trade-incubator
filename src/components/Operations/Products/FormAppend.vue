<template>
  <q-form ref="formRef" @submit="submit">
    <ProductsSelect class="tw-mb-2" v-model="form.product" :disabledIds="disabledIds" :rules="[requiredRule]"  />
    <q-input class="tw-mb-2" filled type="number" label="Цена" v-model="form.price" :rules="[requiredRule]" />
    <q-input filled type="number" label="Количество" v-model="form.count" :rules="[requiredRule]" />
    <q-btn class="tw-w-full tw-mt-3" color="primary" type="submit" flat>Добавить</q-btn>
  </q-form>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import ProductsSelect from 'src/components/Products/Select.vue';
  import { ProductListItem } from 'src/repositories/products';
  import { ProductItem } from '../FormProductsSteps/model';
  import type { QForm } from 'quasar';
  import { nextTick } from 'process';

  const props = defineProps<{
    items: ProductItem[],
  }>();

  const disabledIds = computed(() => {
    return props.items.map(item => item.product.id);
  });

  type Form = Omit<ProductItem, 'product'> & { product: ProductListItem | null };

  const form: Form = reactive({
    product: null,
    price: '',
    count: '',
  });

  const emit = defineEmits<{
    (event: 'append', data: ProductItem): void,
  }>();

  function resetForm() {
    form.product = null;
    form.count = '';
    form.price = '';
  }

  const formRef = ref<QForm | null>(null);

  function submit() {
    emit('append', { ...form } as ProductItem);
    resetForm();
    nextTick(() => formRef.value?.reset());
  }

  const requiredRule = (v: string) => !!v || 'Обязательное поле';
</script>
