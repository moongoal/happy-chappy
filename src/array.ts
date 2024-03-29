import { ArraySchema } from "./schema";
import { validate } from ".";

/**
 * Validate an array.
 *
 * @param obj The value to validate.
 * @param schema The schema to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validateArray(obj: any, schema: ArraySchema): boolean {
    if(!Array.isArray(obj)) {
        return false;
    }

    const arrayObj = obj as any[];
    const {
        itemType,
        length,
        maxLength,
        minLength,
        matcher = () => true
    } = schema;

    if(
        (length !== undefined && arrayObj.length !== length)
        || (minLength !== undefined && arrayObj.length < minLength)
        || (maxLength !== undefined && arrayObj.length > maxLength)
    ) {
        return false;
    }

    const reducer = itemType
        ? (v: any[]) => v.reduce(
            (result, item) => result && validate(item, itemType),
            true
        ) : () => true;

    return matcher(arrayObj) && reducer(arrayObj);
}
