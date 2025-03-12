<template>
  <q-page class="page-py">
    <div class="wrapper">
      <h1 class="h1 tw-mb-5">Продукты</h1>
      <div class="tw-mb-3">
        <q-btn
          color="primary"
          label="Добавить"
        />
      </div>
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
              <q-btn color="primary" round flat icon="edit" size="sm"></q-btn>
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

  const api = useRepositories();
  const { data: products } = useRequest(api.products.list);
</script>
