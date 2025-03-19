<template>
  <q-dialog v-model="value">
    <q-card class="tw-w-full tw-bg-white">
      <q-card-section>
        <div class="tw-flex tw-items-center tw-gap-4">
          <div class="tw-text-xl tw-font-bold tw-grow" :class="{
            'tw-text-red-700': operation?.data.type === 'purchase',
            'tw-text-green-700': operation?.data.type === 'supply',
          }">
            {{ title }}
          </div>
          <q-btn flat round icon="close" @click="value = false" />
        </div>
      </q-card-section>
      <q-card-section class="tw-pt-0" v-if="operation">
        <div class="tw-space-y-4">
          <div>
            <div class="tw-font-bold tw-text-base tw-mb-2">Дата операции:</div>
            <div>{{ $prettyDate(operation.data.date_from) }}</div>
          </div>

          <div>
            <div class="tw-font-bold tw-text-base tw-mb-2">Дата создания:</div>
            <div>{{ $prettyDateShort(operation.data.created_at) }}</div>
          </div>

          <div>
            <div class="tw-font-bold tw-text-base tw-mb-2">Поставщик:</div>
            <div>{{ operation.data.company.name }}</div>
            <div class="tw-mt-1" v-if="operation.data.company.phone">
              <a class="tw-text-blue-700" :href="`tel:${operation.data.company.phone}`">
                {{ operation.data.company.phone }}
              </a>
            </div>
            <div class="tw-mt-1" v-if="operation.data.company.email">
              <a class="tw-text-blue-700" :href="`mailto:${operation.data.company.email}`">
                {{ operation.data.company.email }}
              </a>
            </div>
          </div>

          <div>
            <div class="tw-font-bold tw-text-base tw-mb-2">Тип транзакции:</div>
            <div>
              {{ operation.data.transaction_type === 'cash' ? 'Деньги' : 'Продукты' }}
            </div>
          </div>

          <div v-if="operation.data.transaction_type === 'cash'">
            <div class="tw-font-bold tw-text-base tw-mb-2">Тип оплпты:</div>
            <div>
              {{
                operation.data.payment_source === 'checking-account' ? 'Рассчетный счет'
                : operation.data.payment_source === 'self-collection' ? 'Самоинкасация'
                : 'Продукты'
              }}
            </div>
          </div>

          <div v-if="operation.data.transaction_type === 'products'">
            <div class="tw-font-bold tw-text-base tw-mb-2">Состав:</div>
            <div class="tw-space-y-2 tw-text-sm">
              <div v-for="product in operation.data.products">
                <p>{{ product.name }}</p>
                <p>Цена: {{ $amount(product.price) }}</p>
                <p>Количество: {{ $formatValue(product.count) }}</p>
                <p>Сумма: {{ $amount(product.price * product.count) }}</p>
              </div>
            </div>
          </div>

          <div>
            <div class="tw-font-bold tw-text-base tw-mb-2">Сумма:</div>
            <div class="tw-text-base tw-text-white tw-inline-block tw-px-3 tw-py-1 tw-font-bold" :class="{
              'tw-bg-red-700': operation?.data.type === 'purchase',
              'tw-bg-green-700': operation?.data.type === 'supply',
            }">
              {{ $amount(operation.data.sum) }}
            </div>
          </div>

          <div v-if="operation.data.comment">
            <div class="tw-font-bold tw-text-base tw-mb-2">Комментарий:</div>
            <div class="tw-text-base tw-whitespace-pre-wrap tw-leading-snug">
              {{ operation.data.comment }}
            </div>
          </div>

          <div v-if="operation.data.files.length > 0">
            <div class="tw-font-bold tw-text-base tw-mb-2">Фото:</div>
            <PhotoGallery :items="operation.data.files" />
          </div>
        </div>
        <q-inner-loading :showing="loading"></q-inner-loading>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import PhotoGallery from 'src/components/Files/PhotoGallery/index.vue';
  import usePrettyDate from 'src/composables/usePrettyDate';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import { computed } from 'vue';

  const props = defineProps<{
    operationId: number,
  }>();

  const value = defineModel<boolean>({ default: false });

  const api = useRepositories();

  const { data: operation, loading } = useRequest(
    () => api.operations.show(props.operationId),
    {
      errorText: 'Не удалось загрузить операцию!',
      watch: [ () => props.operationId ],
    },
  );

  const { prettyDateOnly } = usePrettyDate();

  const title = computed(() => {
    if(!operation.value) return '';
    const label = operation.value.data.type === 'purchase' ? 'Отгрузка' : 'Приход';
    return label + ` №${operation.value.data.id} от ${ prettyDateOnly(operation.value.data.date_from) }`
  });
</script>
