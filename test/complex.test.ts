import {
    validateComplex,
    VALIDATE_ERROR_ARRAY_SCHEMA_MISSING,
    VALIDATE_ERROR_ENUM_SCHEMA_MISSING,
    VALIDATE_ERROR_OBJECT_SCHEMA_MISSING,
    VALIDATE_ERROR_SCALAR_SCHEMA_MISSING
} from "../src/complex";
import { Aggregation, AggregationType, ComplexSchema } from "../src/schema";

describe("Complex type definitions", () => {
    describe("A valid value", () => {
        it("should validate", () => {
            expect(validateComplex("a", { scalarType: "string" })).toBeTruthy();
            expect(validateComplex(0, { scalarType: "number" })).toBeTruthy();
            expect(validateComplex(true, { scalarType: "boolean" })).toBeTruthy();
        });
    });

    describe("An invalid value", () => {
        it("should not validate", () => {
            expect(validateComplex(0, { scalarType: "string" })).toBeFalsy();
            expect(validateComplex(true, { scalarType: "string" })).toBeFalsy();
            expect(validateComplex("", { scalarType: "number" })).toBeFalsy();
            expect(validateComplex(false, { scalarType: "number" })).toBeFalsy();
            expect(validateComplex("true", { scalarType: "boolean" })).toBeFalsy();
            expect(validateComplex(1, { scalarType: "boolean" })).toBeFalsy();
        });
    });

    describe("A valid array", () => {
        it("should validate", () => {
            expect(validateComplex([], { aggregation: Aggregation.Array, arrayDef: { itemType: "number" } })).toBeTruthy();
        });
    });

    describe("An invalid array", () => {
        it("should not validate", () => {
            expect(validateComplex(["a"], { aggregation: Aggregation.Array, arrayDef: { itemType: "number" } })).toBeFalsy();
        });
    });

    describe("A valid object", () => {
        it("should validate", () => {
            expect(validateComplex({}, { aggregation: Aggregation.Object, objectDef: { members: {} } })).toBeTruthy();
        });
    });

    describe("An invalid object", () => {
        it("should not validate", () => {
            expect(validateComplex({}, { aggregation: Aggregation.Object, objectDef: { members: { "a": "string" } } })).toBeFalsy();
        });
    });

    describe("A valid enumerated value", () => {
        it("should validate", () => {
            expect(validateComplex(5, { aggregation: Aggregation.Enumeration, enumOptions: [5] })).toBeTruthy();
        });
    });

    describe("An invalid enumerated value", () => {
        it("should not validate", () => {
            expect(validateComplex(5, { aggregation: Aggregation.Enumeration, enumOptions: [] })).toBeFalsy();
        });
    });

    describe("A valid string", () => {
        it("should validate", () => {
            expect(validateComplex("", { scalarType: "string" })).toBeTruthy();
        });
    });

    describe("An invalid string", () => {
        it("should not validate", () => {
            expect(validateComplex(5, { scalarType: "string" })).toBeFalsy();
        });
    });

    describe("A valid number", () => {
        it("should validate", () => {
            expect(validateComplex(0, { scalarType: "number" })).toBeTruthy();
        });
    });

    describe("An invalid number", () => {
        it("should not validate", () => {
            expect(validateComplex("5", { scalarType: "number" })).toBeFalsy();
        });
    });

    describe("A valid boolean", () => {
        it("should validate", () => {
            expect(validateComplex(true, { scalarType: "boolean" })).toBeTruthy();
        });
    });

    describe("An invalid boolean", () => {
        it("should not validate", () => {
            expect(validateComplex(1, { scalarType: "boolean" })).toBeFalsy();
        });
    });

    describe("A valid nullable value", () => {
        it("should validate", () => {
            expect(validateComplex(null, { scalarType: "boolean", nullable: true })).toBeTruthy();
        });
    });

    describe("An invalid nullable value", () => {
        it("should not validate", () => {
            expect(validateComplex(null, { scalarType: "boolean" })).toBeFalsy();
        });
    });

    describe("A valid optional value", () => {
        it("should validate", () => {
            expect(validateComplex(undefined, { scalarType: "boolean", optional: true })).toBeTruthy();
        });
    });

    describe("An invalid optional value", () => {
        it("should not validate", () => {
            expect(validateComplex(undefined, { scalarType: "boolean" })).toBeFalsy();
        });
    });

    describe("A valid string with a regex matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                scalarType: "string",
                stringDef: {
                    matcher: /[ ]am[ ]/
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid string with a regex matcher", () => {
        it("should not validate", () => {
            expect(validateComplex("I am happy", {
                scalarType: "string",
                stringDef: {
                    matcher: /[ ]are[ ]/
                }
            })).toBeFalsy();
        });
    });

    describe("A valid string with a function matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                scalarType: "string",
                stringDef: {
                    matcher: s => s.includes(" am ")
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid string with a function matcher", () => {
        it("should not validate", () => {
            expect(validateComplex("I am happy", {
                scalarType: "string",
                stringDef: {
                    matcher: s => s.includes(" are ")
                }
            })).toBeFalsy();
        });
    });

    describe("A valid string with a value matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                scalarType: "string",
                stringDef: {
                    matcher: "I am happy"
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid string with a value matcher", () => {
        it("should not validate", () => {
            expect(validateComplex("I am happy", {
                scalarType: "string",
                stringDef: {
                    matcher: "I are happy"
                }
            })).toBeFalsy();
        });
    });

    describe("A valid string without a matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                scalarType: "string",
                stringDef: {}
            })).toBeTruthy();
        });
    });

    describe("A valid number with a specific value", () => {
        it("should validate", () => {
            expect(validateComplex(5, {
                scalarType: "number",
                numberDef: {
                    value: 5
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid number with a specific value", () => {
        it("should not validate", () => {
            expect(validateComplex(4, {
                scalarType: "number",
                numberDef: {
                    value: 5
                }
            })).toBeFalsy();
        });
    });

    describe("A valid number with a specific minimum", () => {
        it("should validate", () => {
            expect(validateComplex(5, {
                scalarType: "number",
                numberDef: {
                    min: 5
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid number with a specific minimum", () => {
        it("should not validate", () => {
            expect(validateComplex(4, {
                scalarType: "number",
                numberDef: {
                    min: 5
                }
            })).toBeFalsy();
        });
    });

    describe("A valid number with a specific maximum", () => {
        it("should validate", () => {
            expect(validateComplex(5, {
                scalarType: "number",
                numberDef: {
                    max: 5
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid number with a specific maximum", () => {
        it("should not validate", () => {
            expect(validateComplex(6, {
                scalarType: "number",
                numberDef: {
                    max: 5
                }
            })).toBeFalsy();
        });
    });

    describe("A number with a matcher function as its value", () => {
        const MY_NUMBER = 42;
        const isMyNumber = (n: number) => n === MY_NUMBER;

        it("should validate a valid value", () => {
            expect(validateComplex(MY_NUMBER, {
                scalarType: "number",
                numberDef: { value: isMyNumber }
            })).toBeTruthy();
        });

        it("should not validate an invalid value", () => {
            expect(validateComplex(MY_NUMBER + 1, {
                scalarType: "number",
                numberDef: { value: isMyNumber }
            })).toBeFalsy();
        });
    });

    describe("When a number's isInteger option is specified", () => {
        const schema: ComplexSchema = {
            scalarType: "number",
            numberDef: {
                isInteger: true
            }
        };

        describe("An integer value", () => {
            it("should validate", () => {
                expect(validateComplex(5, schema)).toBeTruthy();
            });
        });

        describe("A floating point value", () => {
            it("should not validate", () => {
                expect(validateComplex(5.1, schema)).toBeFalsy();
            });
        });
    });

    describe("When a floating point value is validated against a floating point constant", () => {
        const schema: ComplexSchema = {
            scalarType: "number",
            numberDef: {
                value: 10.1,
                epsilon: 1.1
            }
        };

        describe("A similar enough value", () => {
            it("shoud validate", () => {
                expect(validateComplex(10.5, schema)).toBeTruthy();
            });
        });

        describe("A different enough value", () => {
            it("shoud not validate", () => {
                expect(validateComplex(11.3, schema)).toBeFalsy();
            });
        });
    });

    describe("A scalar type with no scalar type definition", () => {
        it("should throw", () => {
            expect(() => validateComplex(0, {})).toThrowError(VALIDATE_ERROR_SCALAR_SCHEMA_MISSING);
        });
    });

    describe("An object type with no object type definition", () => {
        it("should throw", () => {
            expect(() => validateComplex({}, { aggregation: Aggregation.Object })).toThrowError(VALIDATE_ERROR_OBJECT_SCHEMA_MISSING);
        });
    });

    describe("An array type with no array type definition", () => {
        it("should throw", () => {
            expect(() => validateComplex({}, { aggregation: Aggregation.Array })).toThrowError(VALIDATE_ERROR_ARRAY_SCHEMA_MISSING);
        });
    });

    describe("An enumeration type with no enumeration type definition", () => {
        it("should throw", () => {
            expect(() => validateComplex({}, { aggregation: Aggregation.Enumeration })).toThrowError(VALIDATE_ERROR_ENUM_SCHEMA_MISSING);
        });
    });

    describe("An invalid aggregation type", () => {
        it("should throw", () => {
            expect(
                () => validateComplex([], { aggregation: "invalid" as AggregationType })
            ).toThrowError(/Unknown aggregation type/);
        });
    });
});
