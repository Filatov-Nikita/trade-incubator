import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from 'src/repositories/auth';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null);

  function setUser(data: User | null) {
    user.value = data;
  }

  return {
    user,
    setUser,
  }
});
