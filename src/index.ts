import { validateComplex } from "./complex";
import { ComplexTypeDef, SimpleTypeDef, TypeDef } from "./schema";
import { validateSimple } from "./simple";
import { isTypeDefSimple } from "./utils";

export interface ValidatorFn {
    (obj: any): boolean
}

export function createValidator(schema: TypeDef): ValidatorFn {
    return (obj: any): boolean => validate(obj, schema);
}

export function validate(obj: any, schema: TypeDef): boolean {
    return isTypeDefSimple(schema)
        ? validateSimple(obj, schema as SimpleTypeDef)
        : validateComplex(obj, schema as ComplexTypeDef);
}
