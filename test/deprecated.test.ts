import { NumberOptions, StringOptions, validate } from "../src";

describe("Deprecated string options", () => {
    const stringOptions: StringOptions = {
        matcher: /hey/
    };

    describe("The old member", () => {
        it("should still work", () => {
            expect(validate("ciao hey hello", { scalarType: "string", stringOptions })).toBeTruthy();
        });
    });

    describe("The new member", () => {
        it("should work", () => {
            expect(validate("ciao hey hello", { scalarType: "string", stringDef: stringOptions })).toBeTruthy();
        });
    });
});

describe("Deprecated number options", () => {
    const numberOptions: NumberOptions = {
        value: 55
    };

    describe("The old member", () => {
        it("should still work", () => {
            expect(validate(55, { scalarType: "number", numberOptions })).toBeTruthy();
        });
    });

    describe("The new member", () => {
        it("should work", () => {
            expect(validate(55, { scalarType: "number", numberDef: numberOptions })).toBeTruthy();
        });
    });
});
