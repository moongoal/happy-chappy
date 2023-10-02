import { validateComplex } from "./complex";
import { ComplexSchema, SimpleSchema, Schema } from "./schema";
import { validateSimple } from "./simple";
import { isSchemaSimple } from "./utils";

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
export function createValidator(schema: Schema): ValidatorFn {
    return (obj: any): boolean => validate(obj, schema);
}

/**
 * Validate a value against a schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validate(obj: any, schema: Schema): boolean {
    return isSchemaSimple(schema)
        ? validateSimple(obj, schema as SimpleSchema)
        : validateComplex(obj, schema as ComplexSchema);
}
