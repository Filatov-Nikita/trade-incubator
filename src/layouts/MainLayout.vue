<template>
  <q-layout class="tw-bg-gray-100" view="hhh Lpr fff">
    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="isMini = !isMini" />
        <q-toolbar-title>Инкубатор - торговый журнал</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer :mini="isMini" v-model="showedMenu" :width="200" :breakpoint="0">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple active :to="{ name: 'home' }">
            <q-item-section avatar>
              <q-icon class="nav-item__icon" name="home" />
            </q-item-section>
            <q-item-section class="nav-item__label">Главная</q-item-section>
          </q-item>
          <q-item clickable v-ripple active :to="{ name: 'products.index' }">
            <q-item-section avatar>
              <q-icon class="nav-item__icon" name="local_mall" />
            </q-item-section>
            <q-item-section class="nav-item__label">Продукты</q-item-section>
          </q-item>
          <q-item clickable v-ripple active :to="{ to: '/2' }">
            <q-item-section avatar>
              <q-icon class="nav-item__icon" name="store" />
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

  const showedMenu = ref(true);
  const isMini = ref(true);
</script>
