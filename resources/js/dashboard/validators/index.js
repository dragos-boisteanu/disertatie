import { helpers } from 'vuelidate/lib/validators';
import validbarcode from "barcode-validator";


const validateBarcode = (value) => !helpers.req(value) || validbarcode(value);
const alphaSpaces = (value) => !helpers.req(value) || /[A-Za-z _.,!"'/$]*/.test(value);
const alphaNumSpaces = (value) => !helpers.req(value) || /[A-Za-z0-9 _.,!"'/$]*/.test(value);
const phoneNumber = (value) => !helpers.req(value) || /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/.test(value)

export {
	alphaSpaces,
	alphaNumSpaces,
	validateBarcode,
	phoneNumber
}