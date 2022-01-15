# happy-chappy

Happy-chappy is a JSON object validator package for JavaScript and TypeScript.

## Usage

```typescript
import { Aggregation, ComplexTypeDef, createValidator, validate } from "happy-chappy";

const MY_OBJECT_SCHEMA = <ComplexTypeDef>{
    aggregation: Aggregation.Object,
    objectDef: {
        members: {
            firstField: "number",

            secondField: {
                scalarType: "number",
                optional: true
            },

            thirdField: "string",

            fourthField: {
                aggregation: Aggregation.Enumeration,
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

## License

This package is licensed under the ISC license.

## Bugs and feedback

You can find the [repostiory for this package](https://github.com/moongoal/happy-chappy) on GitHub.
