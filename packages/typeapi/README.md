# TypeAPI

A completely TypeSafe backend framework

## Installation

```bash
bun add @antribute/typeapi @sinclair/typebox
```

## Usage

If you've never used TypeAPI before, we've built a [complete tutorial](./docs/tutorial.md) that
covers building a simple todo list API! We highly recommend checking that out to understand
TypeAPI's usage as well as recommended design patterns and explanations of some of the
architectural decisions we made while building TypeAPI.

Tutorial aside, here's a vastly simplified, one-file "Hello World" example

```tsx
import { App, Route } from '@antribute/typeapi';
import { Type } from '@sinclair/typebox';

const Greeting = Type.Object({ message: Type.String() });
const GetGreeting = new Route('/greeting', 'get', () => ({ body: { message: 'Hello, World!' } }), {
  output: {
    body: Greeting,
  },
});

const ExampleApp = new App({
  routes: {
    GetGreeting,
  },
});

ExampleApp.start();
```
