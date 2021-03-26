import { extend } from 'vee-validate'
import { required, alpha_spaces, email, integer, double, alpha_num, max  } from 'vee-validate/dist/rules';
import { setInteractionMode } from 'vee-validate';

import {validateBarcode} from './rules/barcode.js'

setInteractionMode('eager');

extend('required', {
    ...required,
    message: 'The {_field_} field is required.'
});

extend('integer', {
    ...integer,
    message: 'The {_field_} must be an integer'
});

extend('double', {
  ...double,
  message: 'The {_field_} must be an double with 2 decimals separated by comma'
});

extend('email', {
    ...email, 
    message: 'The {_field_} must be a valid email address.'
});

extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'The {_field_} must only contain letters.'
});

extend('alpha_num', {
  ...alpha_num,
  message: 'The {_field_} must only contain letters and numbers'
});


extend('max', {
    ...max,
    message: 'The {_field_} must not be greater than {length} characters.',
    params: ['length']
});

extend('max_value', {
    validate(value, { max }) {
        return value <= max;
    },
    params: ['max'],
    message: 'The {_field_} value must not be greater than {max}',
});

extend('barcode', {
    validate: (value) => {
        return validateBarcode(value);
    },
    message: 'The {_field_} must be a valid barcode of EAN-13, EAN-8, UPC-A, or UPC-E type'
});