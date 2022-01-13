import { validateArray } from "./array";
import { validateEnum } from "./enum";
import { validateObject } from "./object";
import { Aggregation, ComplexTypeDef, NumberOptions, StringOptions } from "./schema";
import { validateSimple } from "./simple";

export const VALIDATE_ERROR_SCALAR_TYPEDEF_MISSING = "Scalar types require scalar type definition.";
export const VALIDATE_ERROR_ARRAY_TYPEDEF_MISSING = "Array types require array definition.";
export const VALIDATE_ERROR_OBJECT_TYPEDEF_MISSING = "Object types require object definition.";
export const VALIDATE_ERROR_ENUM_TYPEDEF_MISSING = "Enumeration types require enumeration definition.";

export function validateComplex(obj: any, schema: ComplexTypeDef): boolean {
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
        throw new Error(VALIDATE_ERROR_SCALAR_TYPEDEF_MISSING);
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
            throw new Error(VALIDATE_ERROR_ARRAY_TYPEDEF_MISSING);
        }

        return validateArray(obj, arrayDef);

    case Aggregation.Object:
        if(!objectDef) {
            throw new Error(VALIDATE_ERROR_OBJECT_TYPEDEF_MISSING);
        }

        return validateObject(obj, objectDef);

    case Aggregation.Enumeration:
        if(!enumOptions) {
            throw new Error(VALIDATE_ERROR_ENUM_TYPEDEF_MISSING);
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
 * @param obj The object to test
 * @param schema The schema
 * @returns True if the object matches the schema, false if not.
 */
function validateComplexScalar(obj: any, schema: ComplexTypeDef): boolean {
    const {
        scalarType,
        stringOptions,
        numberOptions
    } = schema;
    let scalarValidator =() => true;

    switch(scalarType) {
    case "string":
        if(stringOptions) {
            scalarValidator = () => validateComplexString(obj, stringOptions);
        }

        break;

    case "number":
        if(numberOptions) {
            scalarValidator = () => validateComplexNumber(obj, numberOptions);
        }

        break;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return validateSimple(obj, scalarType!) && scalarValidator();
}

function validateComplexString(obj: any, options: StringOptions): boolean {
    const { matcher } = options;

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

function validateComplexNumber(obj: any, options: NumberOptions): boolean {
    const { max, min, value } = options;

    if(
        (value !== undefined && obj !== value)
        || (min !== undefined && obj < min)
        || (max !== undefined && obj > max)
    ) {
        return false;
    }

    return true;
}
