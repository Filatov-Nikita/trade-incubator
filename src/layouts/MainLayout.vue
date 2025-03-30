<template>
  <q-layout class="tw-bg-gray-100" view="hhh Lpr fff">
    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="showMenu" />
        <q-toolbar-title>Инкубатор - торговый журнал</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="showedMenu"
      :width="200"
      :mini="isMini"
      show-if-above
      :breakpoint="$q.screen.sizes.sm"
    >
      <q-scroll-area class="fit">
        <q-list padding class="tw-text-gray-700">
          <q-item exact clickable v-ripple :to="{ name: 'home' }">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section class="nav-item__label">Главная</q-item-section>
          </q-item>
          <q-item exact clickable v-ripple :to="{ name: 'products.index' }">
            <q-item-section avatar>
              <q-icon name="local_mall" />
            </q-item-section>
            <q-item-section class="nav-item__label">Продукты</q-item-section>
          </q-item>
          <q-item exact clickable v-ripple :to="{ name: 'companies.index' }">
            <q-item-section avatar>
              <q-icon name="store" />
            </q-item-section>
            <q-item-section class="nav-item__label">Поставщики</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';

  const $q = useQuasar();

  const showedMenu = ref(false);
  const isMini = ref(true);

  function showMenu() {
    if($q.screen.gt.sm) {
      isMini.value = !isMini.value;
    }
    showedMenu.value = true;
  }
</script>
