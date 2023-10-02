import { EnumOptions } from "./schema";

/**
 * Validate an enumerated value.
 *
 * @param obj The value to validate.
 * @param options The enumeration options.
 * @returns True if the value equals one of the enumeration options, false if not.
 */
export function validateEnum<MemberType>(obj: any, options: EnumOptions<MemberType>): boolean {
    return options.includes(obj);
}
