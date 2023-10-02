import { SimpleSchema } from "../src/schema";
import { validateSimple } from "../src/simple";

describe("Simple type definitions", () => {
    test.each([
        { type: "string", value: "" },
        { type: "boolean", value: false },
        { type: "number", value: 0 }
    ])("A valid $type object with a simple type definition should validate", ({ type, value }) => {
        expect(validateSimple(value, type as SimpleSchema)).toBeTruthy();
    });

    test.each([
        { type: "string", value: 1 },
        { type: "string", value: true },
        { type: "boolean", value: 1 },
        { type: "boolean", value: "dummy" },
        { type: "number", value: true },
        { type: "number", value: "dummy" }
    ])("An invalid $type object with a simple type definition should not validate", ({ type, value }) => {
        expect(validateSimple(value, type as SimpleSchema)).toBeFalsy();
    });
});
