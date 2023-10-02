# happy-chappy

Happy-chappy is a compact, dependency free JSON object validator package for JavaScript and TypeScript.

## Usage

```typescript
import { Schema, createValidator, validate } from "happy-chappy";

const MY_OBJECT_SCHEMA = <Schema>{
    object: {
        members: {
            firstField: "number",

            secondField: {
                scalar: "number",
                optional: true
            },

            thirdField: "string",

            fourthField: {
                enumOptions: [1, 2, 3, "four", 5]
            }
        }
    }
};

const validateMyObject = createValidator(MY_OBJECT_SCHEMA);
const myObject = { firstField: 5, thirdField: "hey", fourthField: "four" };

validateMyObject(myObject) === true;

// Or alternatively
validate(myObject, MY_OBJECT_SCHEMA) === true;
```

Many more examples available in the test folder.

## Data types

Supported data types are:

* String
* Number
* Boolean
* Array
* Object
* Enumeration

Each of these can be further restricted using matcher functions or specific configuration.

### String options

Text string validation is supported using multiple types of matcher. A string can be matched by:

* An exact value
* A regular expression
* A matcher function

### Number options

Number validation options allow to restrict the available range as follows:

* Exact value matching (checked with the strict equality operator or matcher)
* Minimum threshold
* Maximum threshold
* Integer vs floating point
* Epsilon (custom floating point comparison constant)

### Array options

Arrays can be further scoped by setting the following:

* Exact length
* Minimum length
* Maximum length
* Matcher function

### Object options

Object specification can be customised by allowing extra memebrs not to be taken into account during validation or by specifying a matcher function.

### Enumerations

Enumerated values can be any string or number, matched with the strict equality operator.

## Matchers

Matchers allow more complex logic to be included in the validation model. For example:

```typescript
const isPersonWithAgeTuple = (v: any[]) => (
    v.length === 2
    && typeof v[0] === "string"
    && typeof v[1] === "number"
    && Number.isInteger(v[1])
); // Enforces [Name: string, Age: integer]

const schema: Schema = {
    array: { matcher: isPersonWithAgeTuple }
};

validate(["Dummy", 5], schema) === true;
validate([5, "Dummy"], schema) === false;
```

### Typing aids

Version 2 brings in typing aids for objects and enumerations to streamline the schema ceration process. When you define a schema for an object or enumeration you can provide a type that will be used to assist in constraining object members and enumerated values.

```typescript
interface MyRequest {
    a: number
    b: string
}

const MY_REQUEST_SCHEMA: Schema<MyRequest> = {
    object: {
        members: {
            a: { ... },
            b: { ... },
            c: { ... }, // TypeScript error!
        }
    }
};
```

```typescript
enum MyEnum {
    first, second
}

const MY_REQUEST_SCHEMA: Schema<MyEnum> = {
    enumOptions: [
        MyEnum.first,
        MyEnum.second,
        MyEnum.third // TypeScript error!
    ]
};
```

```typescript
type MyEnum = "first" | "second";

const MY_REQUEST_SCHEMA: Schema<MyEnum> = {
    enumOptions: [
        "first",
        "second",
        "third" // TypeScript error!
    ]
};
```

## License

This package is licensed under the ISC license.

## Bugs and feedback

You can find the [repostiory for this package](https://github.com/moongoal/happy-chappy) on GitHub.
