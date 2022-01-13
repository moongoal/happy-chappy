import { EnumOptions } from "./schema";

export function validateEnum(obj: any, schema: EnumOptions): boolean {
    return schema.includes(obj);
}
