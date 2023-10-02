/**
 * A simple type definition.
 */
export type SimpleSchema = "string" | "number" | "boolean";

/**
 * An enumeration indicating the type of aggregation a type definition represents.
 */
export enum Aggregation {
    /**
     * An array aggregation requries the `arrayDef` member in a complex type definition.
     */
    Array,

    /**
     * An object aggregation requries the `objectDef` member in a complex type definition.
     */
    Object,

    /**
     * An enumeration aggregation requries the `enumOptions` member in a complex type definition.
     */
    Enumeration,

    /**
     * This option specifies the type definition is not an aggregation but represents a scalar.
     * The `scalarType` member in a complex type definition is required if the `aggregation` member
     * is set to this value.
     */
    Scalar
}

/**
 * An array matcher - used to validate an array against a specific structure.
 */
export interface NumberMatcherFn {
    /**
     * @param n The number to validate.
     * @return True if the number matches the required structure, false if not.
     */
    (n: number): boolean
}

/**
 * An array matcher - used to validate an array against a specific structure.
 */
export interface ArrayMatcherFn {
    /**
     * @param v The array to validate.
     * @return True if the array matches the required structure, false if not.
     */
    (v: any[]): boolean
}

/**
 * An array type definition.
 */
export interface ArraySchema {
    /**
     * The type definition for the items contained in the array.
     */
    itemType?: Schema

    /**
     * Specify this member if the array must be of a specific length.
     */
    length?: number

    /**
     * Specify this member if the array must be of a specific minimum length.
     */
    minLength?: number

    /**
     * Specify this member if the array must be of a specific maximum length.
     */
    maxLength?: number

    /**
     * An array matcher - used to validate an array against a specific structure.
     */
    matcher?: ArrayMatcherFn
}

/**
 * A map of member type definitions for a serializable object.
 */
interface ObjectMemberMap {
    [name: string | number]: Schema
}

/**
 * An object matcher - used to validate an object against a specific structure.
 */
export interface ObjectMatcherFn {
    /**
     * @param v The object to validate.
     * @return True if the object matches the required structure, false if not.
     */
    (v: any): boolean
}

/**
 * A type definition for an object.
 *
 * Here object doesn't mean "any JavaScript object", rather this indicates a serializable object.
 */
export interface ObjectSchema {
    /**
     * The member type definitions.
     */
    members?: ObjectMemberMap

    /**
     * Set this to true to ensure extra members in the object don't cause the validation
     * process to fail.
     *
     * @default false
     */
    allowExtraMembers?: boolean

    /**
     * An object matcher - used to validate an object against a specific structure.
     */
    matcher?: ObjectMatcherFn
}

/**
 * A string matcher - used to validate a string against a specific structure.
 */
export interface StringMatcherFn {
    /**
     * @param s The string to validate.
     * @return True if the string matches the required structure, false if not.
     */
    (s: string): boolean
}

/**
 * String validation options.
 *
 * @deprecated The name of this type is on a path for deprecation, use `StringSchema` instead.
 */
export interface StringOptions {
    /**
     * A string matcher - used to validate a string against a specific structure.
     */
    matcher?: RegExp | StringMatcherFn | string
}

/**
 * String validation options.
 */
export type StringSchema = StringOptions;

/**
 * Number validation options.
 *
 * @deprecated The name of this type is on a path for deprecation, use `NumberSchema` instead.
 */
export interface NumberOptions {
    /**
     * Set this member to ensure the value is exactly the one specified.
     */
    value?: number | NumberMatcherFn

    /**
     * Set this member to ensure the value is greater than the one specified.
     */
    min?: number

    /**
     * Set this member to ensure the value is smaller than the one specified.
     */
    max?: number

    /**
     * Set this member to specify if the value must be an integer or can be a decimal number.
     *
     * @default false
     */
    isInteger?: boolean

    /**
     * When the validating value is a floating point number and *value* is set, this defines the threshold for
     * defining equality.
     *
     * @default Number.EPSILON
     */
    epsilon?: number
}

/**
 * Number validation options.
 */
export type NumberSchema = NumberOptions;

/**
 * Enumeration validation options.
 */
export type EnumOptions = (string | number)[];

/**
 * A complex type definition.
 */
export interface ComplexSchema {
    /**
     * The scalar type if `aggregation` is set to `Aggregation.Scalar`.
     */
    scalarType?: SimpleSchema

    /**
     * Set this member to true to make the value optional (either defined or undefined or not present).
     */
    optional?: boolean

    /**
     * Set this member to true to make the value nullable.
     */
    nullable?: boolean

    /**
     * The array type definition if `aggregation` is set to `Aggregation.Array`.
     */
    arrayDef?: ArraySchema

    /**
     * The object type definition if `aggregation` is set to `Aggregation.Object`.
     */
    objectDef?: ObjectSchema

    /**
     * The aggregation type.
     *
     * @default Aggregation.Scalar
     */
    aggregation?: Aggregation

    /**
     * The enumeration options if `aggregation` is set to `Aggregation.Enumeration`.
     */
    enumOptions?: EnumOptions

    /**
     * The string type definition if this type definition represents a string.
     *
     * @deprecated This member is on a path for deprecation. Use the equivalent `stringDef` instead.
     */
    stringOptions?: StringSchema

    /**
     * The string type definition if this type definition represents a string.
     */
    stringDef?: StringSchema

    /**
     * The number type definition if this type definition represents a number.
     *
     * @deprecated This member is on a path for deprecation. Use the equivalent `numberDef` instead.
     */
    numberOptions?: NumberSchema

    /**
     * The number type definition if this type definition represents a number.
     */
    numberDef?: NumberSchema
}

/**
 * A type definition or schema.
 */
export type Schema = SimpleSchema | ComplexSchema;
