import { TypeDef } from "./schema";

export function isTypeDefSimple(schema: TypeDef): boolean {
    return typeof schema !== "object";
}
