import { ObjectSchema } from "./schema";
import { validate } from ".";

/**
 * Validate an object.
 *
 * @param obj The value to validate.
 * @param schema The object definition to validate against.
 * @returns True if the value matches the schema, false if not.
 */
export function validateObject<MemberType>(obj: any, schema: ObjectSchema<MemberType>): boolean {
    if(typeof obj !== "object" || obj.constructor !== Object) {
        return false;
    }

    const {
        members,
        allowExtraMembers,
        matcher = () => true
    } = schema;

    const actualMembers = Object.keys(obj);
    let expectedMembers: MemberType[] = [];
    let membersValid = true;

    if(members) {
        expectedMembers = Object.keys(members) as unknown as MemberType[];

        if(allowExtraMembers !== true) {
            const hasExtraMembers = !actualMembers.reduce(
                (result, m) => result && expectedMembers.includes(m as unknown as MemberType),
                true
            );

            if(hasExtraMembers) {
                return false;
            }
        }

        membersValid = expectedMembers.reduce<boolean>(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (result, m) => result && validate(obj[m], members[m]!),
            true
        );
    }

    return matcher(obj) && membersValid;
}
