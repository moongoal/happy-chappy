import { Schema, validate } from "../src";

describe("Typing support", () => {
    describe("when an enum type is used", () => {
        enum MyEnum {
            first, second
        }

        const schema: Schema<MyEnum> = {
            enum: [
                MyEnum.first,
                MyEnum.second
            ]
        };

        it("should compile", () => {
            expect(validate(MyEnum.first, schema)).toBeTruthy();
        });
    });

    describe("when a literal is used", () => {
        type MyEnum = "first" | "second" | 3;

        const schema: Schema<MyEnum> = {
            enum: [
                "first",
                "second",
                3
            ]
        };

        it("should compile", () => {
            expect(validate("first", schema)).toBeTruthy();
        });
    });

    describe("when an object is used", () => {
        interface MyRequest {
            a: number
            b: string
        }

        const schema: Schema<MyRequest> = {
            object: {
                members: {
                    a: "number",
                    b: "string"
                }
            }
        };

        it("should compile", () => {
            expect(validate({ a: 2, b: "2" }, schema)).toBeTruthy();
        });
    });
});
