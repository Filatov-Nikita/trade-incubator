<template>
  <q-page class="tw-flex tw-justify-center tw-items-center tw-px-4">
    <q-card class="tw-w-full tw-max-w-[600px] tw-p-4">
      <q-form @submit="send">
        <h1 class="h1 tw-mb-2">Вход</h1>
        <div class="tw-space-y-2">
          <q-input
            required
            type="email"
            label="Email"
            v-model="form.email"
            :error="!!errors.email"
            :error-message="errors.email"
          />
          <q-input
            required
            :type="showedPassword ? 'text' : 'password'"
            label="Пароль"
            v-model="form.password"
            :error="!!errors.password"
            :error-message="errors.password"
          >
          <template v-slot:append>
            <q-icon
              :name="showedPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="showedPassword = !showedPassword"
            />
          </template>
          </q-input>
        </div>
        <q-btn class="tw-mt-6" color="primary" type="submit" :loading="loading">
          Войти
        </q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { reactive, ref } from 'vue';
  import * as Tokens from 'src/utils/token';
  import { useAuthStore } from 'src/stores/auth';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();

  const api = useRepositories();

  const showedPassword = ref(false);

  const form = reactive({
    email: '',
    password: '',
  });

  const router = useRouter();

  const { loading, errors, send } = usePostRequest(
    api.auth.login,
    () => ({
      ...form,
      device_name: navigator.userAgent,
    }),
    {
      errorText: 'Не удалось войти!',
      isForm: true,
      onSuccess({ data: res }) {
        Tokens.set(res.data.token);
        authStore.setUser(res.data.user);
        router.replace('/');
      },
    },
  );
</script>
