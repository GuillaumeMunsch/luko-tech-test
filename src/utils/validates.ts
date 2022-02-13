import regex from './regex';

const addInventoryItemValidate = (values: any) => {
  console.log('Values', values);
  const errors: any = {};

  if (!values.name) errors.name = 'Required';
  else if (values.name.length > 40) errors.name = 'Name too long';
  else if (!values.purchasePrice) errors.purchasePrice = 'Required';
  else if (!values.purchasePrice?.match(regex.numbers))
    errors.purchasePrice = 'Invalid value';
  else if (!values.photo) errors.photo = 'Required';
  else if (values.description && values.description?.length > 500)
    errors.description = 'Description too long';

  console.log('errors', errors);
  return errors;
};

export { addInventoryItemValidate };
