<template>
  <q-dialog v-model="value">
    <q-card class="card-modal">
      <q-card-section>
        <div class="tw-flex tw-items-center tw-gap-4">
          <div class="tw-text-xl tw-font-bold tw-grow">Обновить поставщика</div>
          <q-btn flat round icon="close" @click="value = false" />
        </div>
        <FormUpdate :form="form" :errors="errors" @submit="send" />
        <q-inner-loading :showing="loading || loadingCompany" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import FormUpdate from 'src/components/Companies/FormUpdate.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { reactive } from 'vue';
  import type { CompanyBody } from 'src/repositories/companies';
  import { Notify } from 'quasar';
  import useRequest from 'src/composables/useRequest';

  const props = defineProps<{
    companyId: number,
  }>();

  const emit = defineEmits<{
    (event: 'success'): void,
  }>();

  const value = defineModel<boolean>({ default: false });

  const api = useRepositories();

  const form: CompanyBody = reactive({
    name: '',
    phone: '',
    email: '',
    description: '',
  });

   const { loading: loadingCompany } = useRequest(
    () => api.companies.show(props.companyId),
    {
      onSuccess({ data: res }) {
        form.name = res.data.name;
        form.phone = res.data.phone;
        form.email = res.data.email;
        form.description = res.data.description;
      },
      errorText: 'Не удалось загрузить поставщика',
      watch: [ () => props.companyId ],
    }
  );

  function resetForm() {
    form.name = '';
    form.phone = '';
    form.email = '';
    form.description = '';
  }

  const { send, loading, errors } = usePostRequest(
    () => api.companies.update(props.companyId, form),
    () => {},
    {
      isForm: true,
      errorText: 'Не удалось создать поставщика!',
      onSuccess() {
        value.value = false;
        resetForm();
        emit('success');
        Notify.create({ type: 'positive', message: 'Поставщик успешно создан!' });
      }
    }
  );
</script>
