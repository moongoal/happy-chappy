import { Schema } from "./schema";

/**
 * Check whether a type definition is simple or complex.
 *
 * Every type definition is either simple or complex. A simple type definition is defined by a string value,
 * a complex type definition is expressed as an object containing its definition. A schema is the
 * hierarchical structure representing the structure of a model object and can be expressed
 * as either a simple or complex type definition.
 *
 * @see SimpleSchema
 * @see ComplexSchema
 *
 * @param schema The type definition to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function isSchemaSimple(schema: Readonly<Schema>): boolean {
    return typeof schema !== "object";
}
