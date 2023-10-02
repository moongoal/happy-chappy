import { validateArray } from "./array";
import { validateEnum } from "./enum";
import { validateObject } from "./object";
import { Aggregation, ComplexSchema, NumberSchema, StringSchema } from "./schema";
import { validateSimple } from "./simple";

export const VALIDATE_ERROR_SCALAR_SCHEMA_MISSING = "Scalar types require scalar type definition.";
export const VALIDATE_ERROR_ARRAY_SCHEMA_MISSING = "Array types require array definition.";
export const VALIDATE_ERROR_OBJECT_SCHEMA_MISSING = "Object types require object definition.";
export const VALIDATE_ERROR_ENUM_SCHEMA_MISSING = "Enumeration types require enumeration definition.";

/**
 * Validate a value using a complex schema.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validateComplex(obj: any, schema: ComplexSchema): boolean {
    const {
        arrayDef,
        nullable = false,
        optional = false,
        aggregation = Aggregation.Scalar,
        objectDef,
        enumOptions,
        scalarType
    } = schema;

    if(aggregation === Aggregation.Scalar && !scalarType) {
        throw new Error(VALIDATE_ERROR_SCALAR_SCHEMA_MISSING);
    }

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
    case Aggregation.Array:
        if(!arrayDef) {
            throw new Error(VALIDATE_ERROR_ARRAY_SCHEMA_MISSING);
        }

        return validateArray(obj, arrayDef);

    case Aggregation.Object:
        if(!objectDef) {
            throw new Error(VALIDATE_ERROR_OBJECT_SCHEMA_MISSING);
        }

        return validateObject(obj, objectDef);

    case Aggregation.Enumeration:
        if(!enumOptions) {
            throw new Error(VALIDATE_ERROR_ENUM_SCHEMA_MISSING);
        }

        return validateEnum(obj, enumOptions);

    case Aggregation.Scalar:
        return validateComplexScalar(obj, schema);
    }
}

/**
 * Validate a scalar with a complex type definition.
 * This function assumes the `scalarType` property to be defined.
 *
 * @param obj The value to validate.
 * @param schema The schema to test against.
 * @returns True if the value matches the schema, false if not.
 */
function validateComplexScalar(obj: any, schema: ComplexSchema): boolean {
    const {
        scalarType,
        stringOptions,
        numberOptions,
        stringDef = stringOptions,
        numberDef = numberOptions
    } = schema;
    let scalarValidator =() => true;

    switch(scalarType) {
    case "string":
        if(stringDef) {
            scalarValidator = () => validateComplexString(obj, stringDef);
        }

        break;

    case "number":
        if(numberDef) {
            scalarValidator = () => validateComplexNumber(obj, numberDef);
        }

        break;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return validateSimple(obj, scalarType!) && scalarValidator();
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
