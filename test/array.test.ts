import { validateArray } from "../src/array";

describe("Array type definitions", () => {
    describe("A valid array object", () => {
        it("should validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "number" })).toBeTruthy();
        });
    });

    describe("An empty array", () => {
        it("should validate", () => {
            expect(validateArray([], { itemType: "number" })).toBeTruthy();
        });
    });

    describe("A non-array object", () => {
        it("should not validate", () => {
            expect(validateArray({}, { itemType: "number" })).toBeFalsy();
        });
    });

    describe("An array of the correct length", () => {
        it("should validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "number", length: 3 })).toBeTruthy();
        });
    });

    describe("An array of the wrong length", () => {
        it("should not validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "number", length: 4 })).toBeFalsy();
        });
    });

    describe("An array of the correct minimum length", () => {
        it("should validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "number", minLength: 3 })).toBeTruthy();
        });
    });

    describe("An array of the wrong minimum length", () => {
        it("should not validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "number", minLength: 4 })).toBeFalsy();
        });
    });

    describe("An array of the correct maximum length", () => {
        it("should validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "number", maxLength: 3 })).toBeTruthy();
        });
    });

    describe("An array of the wrong maximum length", () => {
        it("should not validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "number", maxLength: 2 })).toBeFalsy();
        });
    });

    describe("An array of the wrong type", () => {
        it("should not validate", () => {
            expect(validateArray([1, 2, 3], { itemType: "string" })).toBeFalsy();

            expect(validateArray([1, 2, 3], { itemType: "boolean" })).toBeFalsy();
        });
    });
});
