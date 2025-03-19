<template>
  <q-card>
    <q-card-section>
      <div class="tw-flex tw-items-center tw-mb-4 tw-cursor-pointer" @click="showed = !showed">
        <div class="tw-font-bold tw-text-xl tw-grow">Фильтр</div>
        <q-btn
          flat
          round
          :icon="showed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        />
      </div>
      <q-slide-transition>
        <q-form ref="formRef" v-show="showed">
          <div class="tw-flex tw-flex-wrap tw-gap-4">
            <q-input
              class="tw-w-[240px] tw-grow"
              filled
              label="Дата от"
              type="date"
              hide-bottom-space
              v-model="filter.date_from"
            />
            <q-input
              class="tw-w-[240px] tw-grow"
              filled
              label="Дата до"
              type="date"
              hide-bottom-space
              v-model="filter.date_to"
            />
            <CompaniesSelect class="tw-w-[320px] tw-grow" v-model="filter.company" />
          </div>
          <div class="tw-flex tw-flex-wrap tw-gap-4">
            <q-btn color="primary" @click="$emit('apply')">Применить</q-btn>
            <q-btn color="negative" flat @click="$emit('reset')">Сбросить</q-btn>
          </div>
        </q-form>
      </q-slide-transition>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import CompaniesSelect from 'src/components/Companies/Select.vue';
  import { ref } from 'vue';
  import { BalanceParams } from 'src/repositories/operations';
  import type { QForm } from 'quasar';

  const props = defineProps<{
    filter: BalanceParams
  }>();

  const emit = defineEmits<{
    (event: 'apply'): void,
    (event: 'reset'): void,
  }>();

  const showed = ref(true);
</script>
