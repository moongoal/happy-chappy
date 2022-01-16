/**
 * A simple type definition.
 */
export type SimpleTypeDef = "string" | "number" | "boolean";

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

// /**
//  * An array matcher - used to validate an array against a specific structure.
//  */
// export interface NumberMatcherFn {
//     /**
//      * @param n The number to validate.
//      * @return True if the number matches the required structure, false if not.
//      */
//     (n: number): boolean
// }

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
export interface ArrayTypeDef {
    /**
     * The type definition for the items contained in the array.
     */
    itemType?: TypeDef

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
    [name: string | number]: TypeDef
}

/**
 * A type definition for an object.
 *
 * Here object doesn't mean "any JavaScript object", rather this indicates a serializable object.
 */
export interface ObjectTypeDef {
    /**
     * The member type definitions.
     */
    members: ObjectMemberMap

    /**
     * Set this to true to ensure extra members in the object don't cause the validation
     * process to fail.
     *
     * @default false
     */
    allowExtraMembers?: boolean
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
 */
export interface StringOptions {
    /**
     * A string matcher - used to validate a string against a specific structure.
     */
    matcher?: RegExp | StringMatcherFn | string
}

/**
 * Number validation options.
 */
export interface NumberOptions {
    /**
     * Set this member to ensure the value is exactly the one specified.
     */
    value?: number

    /**
     * Set this member to ensure the value is greater than the one specified.
     */
    min?: number

    /**
     * Set this member to ensure the value is smaller than the one specified.
     */
    max?: number
}

/**
 * Enumeration validation options.
 */
export type EnumOptions = (string | number)[];

/**
 * A complex type definition.
 */
export interface ComplexTypeDef {
    /**
     * The scalar type if `aggregation` is set to `Aggregation.Scalar`.
     */
    scalarType?: SimpleTypeDef

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
    arrayDef?: ArrayTypeDef

    /**
     * The object type definition if `aggregation` is set to `Aggregation.Object`.
     */
    objectDef?: ObjectTypeDef

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
     * The string options if this type definition represents a string.
     */
    stringOptions?: StringOptions

    /**
     * The number options if this type definition represents a number.
     */
    numberOptions?: NumberOptions
}

/**
 * A type definition or schema.
 */
export type TypeDef = SimpleTypeDef | ComplexTypeDef;
