export function inputConfig(
  elementType,
  inputType,
  elementPlaceholder,
  validation,
  valid
) {
  return {
    elementType: elementType,
    elementConfig: {
      type: inputType,
      placeholder: elementPlaceholder,
    },
    value: "",
    validation: validation,
    valid: valid,
    touched: false,
  };
}

export function formElements(formElementsArray, data) {
  for (const key in data) {
    formElementsArray.push({
      id: key,
      config: data[key],
    });
  }
}

export function checkValidity(value, rules) {
  let isValid = true;

  if (rules && rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules && rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules && rules.maxLength) {
    isValid = value.length <= rules.minLength && isValid;
  }

  return isValid;
}
