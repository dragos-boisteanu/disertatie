import { helpers } from 'vuelidate/lib/validators';
import validbarcode from "barcode-validator";


const validateBarcode = (value) => validbarcode(value); 
const alphaSpaces = (value) =>   /^[a-zA-Z\ \s]+$/.test(value);
const alphaNumSpaces = (value) => /^[\w\-\s]+$/.test(value);
const phoneNumber = (value) => /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/.test(value)

export {
    alphaSpaces,
    alphaNumSpaces,
    validateBarcode,
    phoneNumber
}