import { Ref } from 'vue';
import { QInput } from 'quasar';

export default function(input: Ref<QInput | null>, field: Ref<string | number>) {
  function clear(val: string) {
    if(!input.value) return val;
    const el = input.value.nativeEl;
    const newVal = val.replace(/\s\s+/g, ' ').replace(/[^0-9\s]/g, '');
    el.value = newVal;
    return newVal;
  }

  function setNative(val: string) {
    if(input.value) {
      input.value.nativeEl.value = val;
    }
  }

  function minValue(val: string | number) {
    return Math.max(1, parseInt(val.toString()));
  }

  function mult(val: string) {
    const [ p1 = '1', p2 = '1' ] = val.trim().split(' ');
    return parseInt(p1) * parseInt(p2);
  }

  function changeCount() {
    let newVal = clear(field.value.toString()).trim();

    if(!newVal) {
      field.value = '';
      setNative('');
      return;
    }

    if(/^[0-9]+\s[0-9]+$/gi.test(newVal)) {
      newVal = mult(newVal).toString();
    }
    newVal = minValue(newVal).toString();
    setNative(newVal);
    field.value = newVal;
  }

  function handleChange(val: string) {
    if(!val) return field.value = '';
    const newVal = clear(val);
    if(/^[0-9]+\s[0-9]+\s$/gi.test(val)) {
      field.value = minValue(mult(newVal)).toString();
      setNative(field.value);
      return field.value;
    }
    field.value = newVal;
    setNative(field.value);
    return field.value
  }

  const onBlur = changeCount;

  return {
    handleChange,
    changeCount,
    onBlur,
  }
}
