<template>
  <q-page class="page-py">
    <div class="wrapper">
      <h1 class="h1 tw-mb-5">Поставщики</h1>
      <div class="tw-mb-3">
        <q-btn
          color="primary"
          label="Добавить"
          @click="showedCreate = true"
        />
      </div>
      <ModalCreate v-model="showedCreate" @success="send" />
      <ModalUpdate
        v-if="activeCompany"
        v-model="showedUpdate"
        :companyId="activeCompany"
        @success="send(); activeCompany = null"
      />
      <q-markup-table v-if="companies" class="tw-max-w-[800px]" flat bordered>
        <thead>
          <tr>
            <th class="tw-text-left">Id</th>
            <th class="tw-text-left">Наименование</th>
            <th class="tw-text-left">Телефон</th>
            <th class="tw-text-left">Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="company in companies.data"
            :key="company.id"
          >
            <td>{{ company.id }}</td>
            <td>{{ company.name }}</td>
            <td>{{ company.phone ?? '-' }}</td>
            <td>{{ company.email ?? '-' }}</td>
            <td class="tw-text-right">
              <q-btn
                color="primary"
                round
                flat
                icon="edit"
                size="sm"
                @click="activeCompany = company.id; showedUpdate = true"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import ModalCreate from 'src/components/Companies/ModalCreate.vue';
  import ModalUpdate from 'src/components/Companies/ModalUpdate.vue';
  import { ref } from 'vue';

  const api = useRepositories();
  const { data: companies, send } = useRequest(
    api.companies.list,
    { errorText: 'Не удалось загрузить поставщиков!' },
  );

  const showedCreate = ref(false);
  const showedUpdate = ref(false);
  const activeCompany = ref<number | null>(null);
</script>
