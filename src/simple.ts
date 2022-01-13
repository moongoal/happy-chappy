import { SimpleTypeDef } from "./schema";

export function validateSimple(obj: any, schema: SimpleTypeDef): boolean {
    return typeof obj === schema;
}
