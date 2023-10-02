import { validateArray } from "./array";
import { validateEnum } from "./enum";
import { validateObject } from "./object";
import { AggregationType, ArrayComplexSchema, ArraySchema, ComplexSchema, EnumComplexSchema, NumberSchema, ObjectComplexSchema, StringSchema } from "./schema";
import { validateSimple } from "./simple";

/**
 * Validate a value using a complex schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validateComplex(obj: any, schema: ComplexSchema): boolean {
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
    const hasObject = schema.object !== undefined;
    const hasArray = schema.array !== undefined;
    const hasEnumeration = schema.enumOptions !== undefined;
    const hasScalar = schema.scalar !== undefined;
    const aggregationMemberCount = +hasObject + +hasArray + +hasEnumeration + +hasScalar;

    if(aggregationMemberCount !== 1) {
        throw new Error("Schema only allows zero or one of \"array\", \"object\", \"enum\", \"scalar\" members to be defined.");
    }

    if(hasScalar) {
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
function validateComplexScalar(obj: any, schema: ComplexSchema): boolean {
    const {
        scalar,
        string,
        number
    } = schema;
    let scalarValidator =() => true;

    switch(scalar) {
    case "string":
        if(string) {
            scalarValidator = () => validateComplexString(obj, string);
        }

        break;

    case "number":
        if(number) {
            scalarValidator = () => validateComplexNumber(obj, number);
        }

        break;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return validateSimple(obj, scalar!) && scalarValidator();
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
