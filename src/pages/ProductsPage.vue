<template>
  <q-page class="page-py">
    <div class="wrapper">
      <h1 class="h1 tw-mb-5">Продукты</h1>
      <div class="tw-mb-3">
        <q-btn
          color="primary"
          label="Добавить"
          @click="showedCreate = true"
        />
      </div>
      <ModalCreate v-model="showedCreate" @success="send" />
      <ModalUpdate
        v-if="activeProduct"
        v-model="showedUpdate"
        :productId="activeProduct"
        @success="send(); activeProduct = null"
      />
      <q-markup-table v-if="products" flat bordered>
        <thead>
          <tr>
            <th class="tw-text-left">Id</th>
            <th class="tw-text-left">Наименование</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products.data"
            :key="product.id"
          >
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>
              <q-btn
                color="primary"
                round
                flat
                icon="edit"
                size="sm"
                @click="activeProduct = product.id; showedUpdate = true"
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
  import ModalCreate from 'src/components/Products/ModalCreate.vue';
  import ModalUpdate from 'src/components/Products/ModalUpdate.vue';
  import { ref } from 'vue';

  const api = useRepositories();
  const { data: products, send } = useRequest(
    api.products.list,
    { errorText: 'Не удалось загрузить продукты!' },
  );

  const showedCreate = ref(false);
  const showedUpdate = ref(false);
  const activeProduct = ref<number | null>(null);
</script>
