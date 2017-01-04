// get all fields from a html form as JS object
export function getFormData(formid) {
  return $(`#${formid}`).serializeArray().reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});
}

// used for callbacks when we just want to show an error if one happened.
export function errorCallback(_, error) {
  if (error) {
    alert(error);
    console.log(error);
  }
}