import { helpers } from 'vuelidate/lib/validators';
import validbarcode from "barcode-validator";


const alphaSpaces = (value) => helpers.regex(value, /^[a-z][a-z\s]*$/);

const validateBarcode = (value) => validbarcode(value); 

export {
    alphaSpaces,
    validateBarcode
}