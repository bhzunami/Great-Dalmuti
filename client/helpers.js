export function getFormData(formid) {
  return $(`#${formid}`).serializeArray().reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});
}