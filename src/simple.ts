import { SimpleSchema } from "./schema";

/**
 * Validate a value using a simple schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validateSimple(obj: any, schema: SimpleSchema): boolean {
    return typeof obj === schema;
}
