import { SimpleSchema } from "../src/schema";
import { isSchemaSimple } from "../src/utils";

describe("Utility functions", () => {
    describe("isSchemaSimple", () => {
        describe("A simple type definition", () => {
            test.each<SimpleSchema>([
                "string",
                "boolean",
                "number"
            ])("%s should pass the test", type => {
                expect(isSchemaSimple(type)).toBeTruthy();
            });
        });

        describe("A complex type definition", () => {
            it("should not pass the test", () => {
                expect(isSchemaSimple({})).toBeFalsy();
            });
        });
    });
});
