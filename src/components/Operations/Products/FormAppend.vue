<template>
  <q-form ref="formRef" @submit="onSubmit">
    <ProductsSelect class="tw-mb-2" v-model="form.product" :disabledIds="disabledIds" :rules="[requiredRule]"  />
    <q-input class="tw-mb-2" min="0" step="0.01" filled type="number" label="Цена" v-model="form.price" :rules="[requiredRule]" />
    <q-input ref="countRef" filled label="Количество" :rules="[requiredRule]" :modelValue="form.count" @update:modelValue="handleChange($event as string)" @blur="onBlur" />
    <q-btn class="tw-w-full tw-mt-3" color="primary" type="submit" flat>Добавить</q-btn>
  </q-form>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, toRef, nextTick } from 'vue';
  import ProductsSelect from 'src/components/Products/Select.vue';
  import { ProductListItem } from 'src/repositories/products';
  import { ProductItem } from '../FormProductsSteps/model';
  import type { QForm, QInput } from 'quasar';
  import useCountInput from 'src/composables/useCountInput';

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
    emit('append', {
      product: form.product!,
      count: parseInt(form.count.toString()),
      price: Math.max(0, Math.floor(parseFloat(form.price.toString()) * 100) / 100),
    });
    resetForm();
    nextTick(() => formRef.value?.resetValidation());
  }

  const onSubmit = () => setTimeout(submit, 0);

  const requiredRule = (v: string) => !!v || 'Обязательное поле';

  const countRef = ref<QInput | null>(null);
  const { onBlur, handleChange } = useCountInput(countRef, toRef(form, 'count'));
</script>
