import { EnumOptions } from "../src/schema";
import { validateEnum } from "../src/enum";

describe("Enumeration type definitions", () => {
    const testEnumOptions: EnumOptions = ["a", "b", 3];

    describe("A valid enumeration object", () => {
        test.each(testEnumOptions)("should validate", value => {
            expect(validateEnum(value, testEnumOptions)).toBeTruthy();
        });
    });

    describe("An invalid enumeration object", () => {
        it("should not validate", () => {
            expect(validateEnum(5, testEnumOptions)).toBeFalsy();
        });
    });
});
