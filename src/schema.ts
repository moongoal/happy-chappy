/**
 * A simple type definition.
 */
export type SimpleSchema = "string" | "number" | "boolean";

/**
 * An enumeration indicating the type of aggregation a type definition represents.
 */
export type AggregationType = "array" | "object" | "enum" | "scalar";

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
 * The default member type used when no member type is explicitly provided.
 */
export type DefaultMemberType = {
    [name: string | number]: Schema
} | string | number;

/**
 * A map of member type definitions for a serializable object.
 */
type ObjectMemberMap<MemberType = DefaultMemberType> = {
    [name in keyof MemberType]: Schema
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
export interface ObjectSchema<MemberType = DefaultMemberType> {
    /**
     * The member type definitions.
     */
    members?: ObjectMemberMap<MemberType>

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
 * String validation schema.
 */
export interface StringSchema {
    /**
     * A string matcher - used to validate a string against a specific structure.
     */
    matcher?: RegExp | StringMatcherFn | string
}

/**
 * Number validation schema.
 */
export interface NumberSchema {
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
 * Enumeration validation options.
 */
export type EnumOptions<MemberType = string | number> = readonly (MemberType)[];

/**
 * Base common schema.
 */
export interface BaseComplexSchema {
    /**
     * Set this member to true to make the value optional (either defined or undefined or not present).
     */
    optional?: boolean

    /**
     * Set this member to true to make the value nullable.
     */
    nullable?: boolean
}

export interface ArrayComplexSchema extends BaseComplexSchema {
    /**
     * The array type definition if the schema represents an array.
     */
    array?: ArraySchema
}

export interface ObjectComplexSchema<MemberType> extends BaseComplexSchema {
    /**
     * The object type definition if if the schema represents an object.
     */
    object?: ObjectSchema<MemberType>
}

export interface EnumComplexSchema<MemberType> extends BaseComplexSchema {
    /**
     * The enumeration options if if the schema represents an enumeration.
     */
    enum?: EnumOptions<MemberType>
}

export interface ScalarComplexSchema extends BaseComplexSchema {
    /**
     * The string type definition if this type definition represents a string.
     */
    string?: StringSchema

    /**
     * The number type definition if this type definition represents a number.
     */
    number?: NumberSchema

    /**
     * The boolean type definition if this type definition represents a boolean.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    boolean?: {}
}

/**
 * A complex type definition.
 */
export type ComplexSchema<MemberType = DefaultMemberType> = (
    ScalarComplexSchema
    | EnumComplexSchema<MemberType>
    | ObjectComplexSchema<MemberType>
    | ArrayComplexSchema
);

/**
 * A type definition or schema.
 */
export type Schema<MemberType = DefaultMemberType> = SimpleSchema | ComplexSchema<MemberType>;
