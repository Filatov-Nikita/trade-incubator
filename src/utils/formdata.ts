export function jsonFormData<T extends Record<string, any>>(json: T, parentForm?: FormData, parentKey?: string) {
  const formData = parentForm ?? (new FormData());
  for(let key in json) {
    if(typeof json[key] === 'object' && !((json[key] as object) instanceof File)) {
      jsonFormData(
        json[key],
        formData,
        parentKey ? `${parentKey}[${key}]` : key
      );
    } else {
      formData.append(
        parentKey ? `${parentKey}[${key}]` : key,
        json[key]
      );
    }
  }
  return formData;
}
