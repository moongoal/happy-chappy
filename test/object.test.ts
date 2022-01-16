import { validateObject } from "../src/object";

describe("Object type definitions", () => {
    describe("A valid object", () => {
        it("should validate", () => {
            expect(validateObject({ a: 5 }, {
                members: {
                    a: "number"
                }
            })).toBeTruthy();
        });
    });

    describe("An empty object", () => {
        it("should validate", () => {
            expect(validateObject({}, { members: {} })).toBeTruthy();
        });
    });

    describe("A non-object", () => {
        it("should not validate", () => {
            expect(validateObject([], { members: {} })).toBeFalsy();

            expect(validateObject("", { members: {} })).toBeFalsy();

            expect(validateObject(1, { members: {} })).toBeFalsy();

            expect(validateObject(true, { members: {} })).toBeFalsy();
        });
    });

    describe("An object with extra members (not allowed)", () => {
        it("should not validate", () => {
            expect(validateObject({ a: 5, b: "hey" }, {
                members: {
                    a: "number"
                }
            })).toBeFalsy();
        });
    });

    describe("An object with extra members (allowed)", () => {
        it("should validate", () => {
            expect(validateObject({ a: 5, b: "hey" }, {
                members: {
                    a: "number"
                },
                allowExtraMembers: true
            })).toBeTruthy();
        });
    });

    describe("An object with an invalid member", () => {
        it("should not validate", () => {
            expect(validateObject({ a: "b" }, {
                members: {
                    a: "number"
                }
            })).toBeFalsy();
        });
    });

    describe("An object with an optional member not present", () => {
        it("should validate", () => {
            expect(validateObject(
                {},
                { members: { "a": { optional: true, scalarType: "string" } } }
            )).toBeTruthy();
        });
    });

    describe("An object with a matcher", () => {
        const isMyObject = (x: any) => Object.keys(x).includes("myEntry");

        it("should validate a valid value", () => {
            validateObject({ myEntry: 0 }, { matcher: isMyObject });
        });

        it("should not validate an invalid value", () => {
            validateObject({ myOtherEntry: 0 }, { matcher: isMyObject });
        });
    });
});
