export function prettyDateShort(str: string) {
  return new Date(str).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function prettyDateOnly(str: string) {
  return new Date(str).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function prettyDate(str: string) {
  return new Date(str).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function usePrettyDate() {
  return {
    prettyDateShort,
    prettyDateOnly,
    prettyDate,
  }
}
