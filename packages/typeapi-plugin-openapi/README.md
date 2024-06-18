# TypeBox Errors

Helpful utilities surrounding TypeBox validation errors

## Installation

```bash
bun add @antribute/typebox-errors @sinclair/typebox
```

## Usage

```typescript
import { Errors } from '@antribute/typebox-errors';
import { Type } from '@sinclair/typebox';

const Schema = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});

const value = {
  name: 'Foo',
  age: null,
};

const { success, data, errors } = Errors.Check(schema, value);

if (!success) {
  const errorMessage = Errors.Message(errors);
}
```
