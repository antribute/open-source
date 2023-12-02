# TypeBox Validator Middleware for Hono

An unofficial validator middleware using TypeBox for Hono applications

## Installation

```bash
bun add @antribute/hono-typebox-validator @sinclair/typebox hono
```

## Usage

```typescript
import { tbValidator } from '@antribute/hono-typebox-validator';
import { Type } from '@sinclair/typebox';

const Schema = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});

app.post('/author', tbValidator('json', schema), (c) => {
  const data = c.req.valid('json');
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  });
});
```

## Attribution

The majority of this code is based directly off of
[`@hono/zod-validator`](https://www.npmjs.com/package/@hono/zod-validator), which is written by
[Yusuke Wada](https://github.com/yusukebe) under the MIT license
