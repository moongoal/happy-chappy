import { validateArray } from "./array";
import { validateEnum } from "./enum";
import { validateObject } from "./object";

import {
    AggregationType,
    ArrayComplexSchema,
    ComplexSchema,
    EnumComplexSchema,
    NumberSchema,
    ObjectComplexSchema,
    ScalarComplexSchema,
    StringSchema
} from "./schema";

/**
 * Validate a value using a complex schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validateComplex(obj: any, schema: Readonly<ComplexSchema>): boolean {
    const {
        nullable = false,
        optional = false
    } = schema;

    const aggregation = inferAggregation(schema);

    if(
        (nullable === false && obj === null)
        || (optional === false && obj === undefined)
    ) {
        return false;
    }

    if(
        (nullable === true && obj === null)
        || (optional === true && obj === undefined)
    ) {
        return true;
    }

    switch(aggregation) {
    case "array": {
        const { array } = schema as ArrayComplexSchema;

        // Rule disabled because aggregation type implies this member being present
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return validateArray(obj, array!);
    }

    case "object": {
        const { object } = schema as ObjectComplexSchema<unknown>;

        // Rule disabled because aggregation type implies this member being present
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return validateObject(obj, object!);
    }

    case "enum": {
        const { enumOptions } = schema as EnumComplexSchema<unknown>;

        // Rule disabled because aggregation type implies this member being present
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return validateEnum(obj, enumOptions!);
    }

    case "scalar":
        return validateComplexScalar(obj, schema);
    }
}

/**
 * Infer the aggregation type the schema represents.
 *
 * @param schema The schema to infer the aggregation type for.
 * @returns The inferred schema aggregation type.
 */
function inferAggregation(schema: ComplexSchema): AggregationType {
    const keys = Object.keys(schema);
    const hasObject = keys.includes("object");
    const hasArray = keys.includes("array");
    const hasEnumeration = keys.includes("enumOptions");
    const hasString = keys.includes("string");
    const hasNumber = keys.includes("number");
    const hasBoolean = keys.includes("boolean");
    const aggregationMemberCount = +hasObject + +hasArray + +hasEnumeration + +hasString + +hasNumber + +hasBoolean;

    if(aggregationMemberCount !== 1) {
        throw new Error("Schema only allows one of \"array\", \"object\", \"enum\", \"string\", \"number\", \"boolean\" members to be defined.");
    }

    if(hasString || hasNumber || hasBoolean) {
        return "scalar";
    }

    if(hasObject) {
        return "object";
    }

    if(hasArray) {
        return "array";
    }

    return "enum";
}

/**
 * Validate a scalar with a complex type definition.
 * This function assumes the `scalar` property to be defined.
 *
 * @param obj The value to validate.
 * @param schema The schema to test against.
 * @returns True if the value matches the schema, false if not.
 */
function validateComplexScalar(obj: any, schema: ScalarComplexSchema): boolean {
    const {
        string,
        number,
        boolean
    } = schema;
    let scalarValidator = () => true;

    if(string) {
        scalarValidator = () => (typeof obj === "string" && validateComplexString(obj, string));
    }

    if(number) {
        scalarValidator = () => (typeof obj === "number" && validateComplexNumber(obj, number));
    }

    if(boolean) {
        scalarValidator = () => (typeof obj === "boolean");
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return scalarValidator();
}

/**
 * Validate a string using a complex schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
function validateComplexString(obj: string, schema: StringSchema): boolean {
    const { matcher } = schema;

    if(matcher) {
        if(typeof matcher === "string") {
            return obj === matcher;
        }

        if(typeof matcher === "function") {
            return matcher(obj);
        }

        return matcher.test(obj);
    }

    return true;
}

/**
 * Validate a number using a complex schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
function validateComplexNumber(obj: number, schema: NumberSchema): boolean {
    const {
        max,
        min,
        value,
        isInteger = false,
        epsilon = Number.EPSILON
    } = schema;

    if(isInteger && !Number.isInteger(obj)) {
        return false;
    }

    if(
        (min !== undefined && obj < min)
        || (max !== undefined && obj > max)
    ) {
        return false;
    }

    if(value !== undefined) {
        if(typeof value === "number") {
            return Number.isInteger(value)
                ? obj === value
                : Math.abs(obj - value) < epsilon;
        } else {
            return value(obj);
        }
    }

    return true;
}
