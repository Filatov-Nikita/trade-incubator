<template>
  <q-layout class="tw-bg-gray-100" view="hhh Lpr fff">
    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="showMenu" />
        <q-toolbar-title>Инкубатор - торговый журнал</q-toolbar-title>
        <q-btn
          v-if="authStore.user && ($q.screen.sm || $q.screen.gt.sm)"
          class="!tw-capitalize"
          flat
          iconRight="logout"
          :label="authStore.user.name"
          @click="logout"
        />
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
          <q-item exact clickable v-ripple v-if="authStore.user && $q.screen.lt.sm" @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section class="nav-item__label !tw-capitalize">{{ authStore.user.name }}</q-item-section>
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
  import * as Token from 'src/utils/token';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from 'src/stores/auth';

  const $q = useQuasar();

  const showedMenu = ref(false);
  const isMini = ref(true);

  function showMenu() {
    if($q.screen.sm || $q.screen.gt.sm) {
      isMini.value = !isMini.value;
    }
    showedMenu.value = true;
  }

  const router = useRouter();

  const authStore = useAuthStore();

  function logout() {
    Token.remove();
    authStore.setUser(null);
    router.replace('/login');
    window.location.reload();
  }
</script>
