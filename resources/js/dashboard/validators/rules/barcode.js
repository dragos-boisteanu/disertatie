import validbarcode from "barcode-validator";

const validateBarcode = (value) => validbarcode(value); 

export {
    validateBarcode,
}