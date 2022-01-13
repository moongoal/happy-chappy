import { ObjectTypeDef } from "./schema";
import { validate } from ".";

export function validateObject(obj: any, schema: ObjectTypeDef): boolean {
    if(typeof obj !== "object" || obj.constructor !== Object) {
        return false;
    }

    const { members, allowExtraMembers } = schema;

    const actualMembers = Object.keys(obj);
    const expectedMembers = Object.keys(members);

    if(allowExtraMembers !== true) {
        const hasExtraMembers = !actualMembers.reduce(
            (result, m) => result && expectedMembers.includes(m),
            true
        );

        if(hasExtraMembers) {
            return false;
        }
    }

    return expectedMembers.reduce<boolean>(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (result, m) => result && validate(obj[m], members[m]!),
        true
    );
}
