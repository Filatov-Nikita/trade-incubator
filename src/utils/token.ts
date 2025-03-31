export function set(value: string) {
  localStorage.setItem('token', value);
}

export function get() {
  return localStorage.getItem('token');
}

export function remove() {
  localStorage.removeItem('token');
}
