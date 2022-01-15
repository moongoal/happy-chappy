import { validateComplex } from "./complex";
import { ComplexTypeDef, SimpleTypeDef, TypeDef } from "./schema";
import { validateSimple } from "./simple";
import { isTypeDefSimple } from "./utils";

export * from "./schema";

/**
 * A validator function.
 *
 * @see createValidator()
 */
export interface ValidatorFn {
    /**
     * Validate a value.
     *
     * @param obj The value to validate.
     * @returns True if the value matches the schema of the validator, false if not.
     */
    (obj: any): boolean
}

/**
 * Create a validator function for a given schema.
 *
 * @param schema The schema the validator function will validate against.
 * @returns A new validator function for the given schema.
 */
export function createValidator(schema: TypeDef): ValidatorFn {
    return (obj: any): boolean => validate(obj, schema);
}

/**
 * Validate a value against a schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validate(obj: any, schema: TypeDef): boolean {
    return isTypeDefSimple(schema)
        ? validateSimple(obj, schema as SimpleTypeDef)
        : validateComplex(obj, schema as ComplexTypeDef);
}
