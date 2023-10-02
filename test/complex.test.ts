import { validateComplex } from "../src/complex";
import { ComplexSchema } from "../src/schema";

describe("Complex type definitions", () => {
    describe("A valid value", () => {
        it("should validate", () => {
            expect(validateComplex("a", { string: {} })).toBeTruthy();
            expect(validateComplex(0, { number: {} })).toBeTruthy();
            expect(validateComplex(true, { boolean: {} })).toBeTruthy();
        });
    });

    describe("An invalid value", () => {
        it("should not validate", () => {
            expect(validateComplex(0, { string: {} })).toBeFalsy();
            expect(validateComplex(true, { string: {} })).toBeFalsy();
            expect(validateComplex("", { number: {} })).toBeFalsy();
            expect(validateComplex(false, { number: {} })).toBeFalsy();
            expect(validateComplex("true", { boolean: {} })).toBeFalsy();
            expect(validateComplex(1, { boolean: {} })).toBeFalsy();
        });
    });

    describe("A valid array", () => {
        it("should validate", () => {
            expect(validateComplex([], { array: { itemType: "number" } })).toBeTruthy();
        });
    });

    describe("An invalid array", () => {
        it("should not validate", () => {
            expect(validateComplex(["a"], { array: { itemType: "number" } })).toBeFalsy();
        });
    });

    describe("A valid object", () => {
        it("should validate", () => {
            expect(validateComplex({}, { object: { members: {} } })).toBeTruthy();
        });
    });

    describe("An invalid object", () => {
        it("should not validate", () => {
            expect(validateComplex({}, { object: { members: { "a": "string" } } })).toBeFalsy();
        });
    });

    describe("A valid enumerated value", () => {
        it("should validate", () => {
            expect(validateComplex(5, { enumOptions: [5] })).toBeTruthy();
        });
    });

    describe("An invalid enumerated value", () => {
        it("should not validate", () => {
            expect(validateComplex(5, { enumOptions: [] })).toBeFalsy();
        });
    });

    describe("A valid string", () => {
        it("should validate", () => {
            expect(validateComplex("", { string: {} })).toBeTruthy();
        });
    });

    describe("An invalid string", () => {
        it("should not validate", () => {
            expect(validateComplex(5, { string: {} })).toBeFalsy();
        });
    });

    describe("A valid number", () => {
        it("should validate", () => {
            expect(validateComplex(0, { number: {} })).toBeTruthy();
        });
    });

    describe("An invalid number", () => {
        it("should not validate", () => {
            expect(validateComplex("5", { number: {} })).toBeFalsy();
        });
    });

    describe("A valid boolean", () => {
        it("should validate", () => {
            expect(validateComplex(true, { boolean: {} })).toBeTruthy();
        });
    });

    describe("An invalid boolean", () => {
        it("should not validate", () => {
            expect(validateComplex(1, { boolean: {} })).toBeFalsy();
        });
    });

    describe("A valid nullable value", () => {
        it("should validate", () => {
            expect(validateComplex(null, { boolean: {}, nullable: true })).toBeTruthy();
        });
    });

    describe("An invalid nullable value", () => {
        it("should not validate", () => {
            expect(validateComplex(null, { boolean: {} })).toBeFalsy();
        });
    });

    describe("A valid optional value", () => {
        it("should validate", () => {
            expect(validateComplex(undefined, { boolean: {}, optional: true })).toBeTruthy();
        });
    });

    describe("An invalid optional value", () => {
        it("should not validate", () => {
            expect(validateComplex(undefined, { boolean: {} })).toBeFalsy();
        });
    });

    describe("A valid string with a regex matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                string: {
                    matcher: /[ ]am[ ]/
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid string with a regex matcher", () => {
        it("should not validate", () => {
            expect(validateComplex("I am happy", {
                string: {
                    matcher: /[ ]are[ ]/
                }
            })).toBeFalsy();
        });
    });

    describe("A valid string with a function matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                string: {
                    matcher: s => s.includes(" am ")
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid string with a function matcher", () => {
        it("should not validate", () => {
            expect(validateComplex("I am happy", {
                string: {
                    matcher: s => s.includes(" are ")
                }
            })).toBeFalsy();
        });
    });

    describe("A valid string with a value matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                string: {
                    matcher: "I am happy"
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid string with a value matcher", () => {
        it("should not validate", () => {
            expect(validateComplex("I am happy", {
                string: {
                    matcher: "I are happy"
                }
            })).toBeFalsy();
        });
    });

    describe("A valid string without a matcher", () => {
        it("should validate", () => {
            expect(validateComplex("I am happy", {
                string: {}
            })).toBeTruthy();
        });
    });

    describe("A valid number with a specific value", () => {
        it("should validate", () => {
            expect(validateComplex(5, {
                number: {
                    value: 5
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid number with a specific value", () => {
        it("should not validate", () => {
            expect(validateComplex(4, {
                number: {
                    value: 5
                }
            })).toBeFalsy();
        });
    });

    describe("A valid number with a specific minimum", () => {
        it("should validate", () => {
            expect(validateComplex(5, {
                number: {
                    min: 5
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid number with a specific minimum", () => {
        it("should not validate", () => {
            expect(validateComplex(4, {
                number: {
                    min: 5
                }
            })).toBeFalsy();
        });
    });

    describe("A valid number with a specific maximum", () => {
        it("should validate", () => {
            expect(validateComplex(5, {
                number: {
                    max: 5
                }
            })).toBeTruthy();
        });
    });

    describe("An invalid number with a specific maximum", () => {
        it("should not validate", () => {
            expect(validateComplex(6, {
                number: {
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
                number: { value: isMyNumber }
            })).toBeTruthy();
        });

        it("should not validate an invalid value", () => {
            expect(validateComplex(MY_NUMBER + 1, {
                number: { value: isMyNumber }
            })).toBeFalsy();
        });
    });

    describe("When a number's isInteger option is specified", () => {
        const schema: ComplexSchema = {
            number: {
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
            number: {
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

    describe("An empty schema", () => {
        it("should throw", () => {
            expect(
                () => validateComplex([], { })
            ).toThrowError(/Schema only allows one/);
        });
    });
});
