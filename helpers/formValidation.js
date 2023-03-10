export const rules = {
  required: (v) => !!v || 'This field is required',
  email: (v) => /.+@.+\..+/.test(v) || 'Enter a valid email',
  mobile: (v) => !v || /^(\d+)$/.test(v) || 'Enter a valid mobile number',
  mobileLength: (v) => v?.length === 10 || 'Enter a 10 digit mobile number',
  number: (v) => !v || /^(\d+)$/.test(v) || 'Enter a valid number',
  name: (v) =>
    v => v.length <= 10 || 'Name must be less than 10 characters',
  nameCase:(v)=> (/^[A-Z]+$/.test(v)) || 'Name must be in upper case',
  extension:(v) =>  (/^\d{3}$/.test(v)) || 'extension must be in 3 digits',
  number: (v) => !v || /^(\d+)$/.test(v) || 'Enter a valid number',
  alphabet: (v) =>
  (/^[A-Za-z]+$/.test(v)) || 'Name should be valid',
};
