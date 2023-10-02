import { createValidator, validate } from "../src";

describe("validate()", () => {
    describe("A valid value with a complex type definition", () => {
        it("should validate", () => {
            expect(validate("a", "string")).toBeTruthy();
        });
    });

    describe("A valid value with a complex type definition", () => {
        it("should validate", () => {
            expect(validate("a", { scalar: "string" })).toBeTruthy();
        });
    });
});

describe("createValidator()", () => {
    describe("A validator for a given schema", () => {
        const validator = createValidator("boolean");

        it("should validate a valid value", () => {
            expect(validator(true)).toBeTruthy();
        });

        it("should not validate an ivalid value", () => {
            expect(validator(1)).toBeFalsy();
        });
    });
});
