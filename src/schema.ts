export type SimpleTypeDef = "string" | "number" | "boolean";

export enum Aggregation {
    Array,
    Object,
    Enumeration,
    Scalar
}

export interface ArrayTypeDef {
    itemType: TypeDef
    length?: number
    minLength?: number
    maxLength?: number
}

interface ObjectMemberMap {
    [name: string | number]: TypeDef
}

export interface ObjectTypeDef {
    members: ObjectMemberMap
    allowExtraMembers?: boolean
}

export interface StringMatcherFn {
    (s: string): boolean
}

export interface StringOptions {
    matcher?: RegExp | StringMatcherFn | string
}

export interface NumberOptions {
    value?: number
    min?: number
    max?: number
}

export type EnumOptions = (string | number)[];

export interface ComplexTypeDef {
    scalarType?: SimpleTypeDef
    optional?: boolean
    nullable?: boolean
    arrayDef?: ArrayTypeDef
    objectDef?: ObjectTypeDef
    aggregation?: Aggregation
    enumOptions?: EnumOptions
    stringOptions?: StringOptions
    numberOptions?: NumberOptions
}

export type TypeDef = SimpleTypeDef | ComplexTypeDef;
