import { SimpleTypeDef } from "../src/schema";
import { isTypeDefSimple } from "../src/utils";

describe("Utility functions", () => {
    describe("isTypeDefSimple", () => {
        describe("A simple type definition", () => {
            test.each<SimpleTypeDef>([
                "string",
                "boolean",
                "number"
            ])("%s should pass the test", type => {
                expect(isTypeDefSimple(type)).toBeTruthy();
            });
        });

        describe("A complex type definition", () => {
            it("should not pass the test", () => {
                expect(isTypeDefSimple({})).toBeFalsy();
            });
        });
    });
});
