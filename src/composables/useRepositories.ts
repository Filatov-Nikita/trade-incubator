import { repositoriesKey } from 'src/boot/api';
import { inject } from 'vue';

export default function() {
  const repositories = inject(repositoriesKey);
  if(!repositories) throw new Error('Модуль repositories не найден');
  return repositories;
}
