# TypeAPI Todo List Tutorial

This is a very basic tutorial for those that have never used TypeAPI before! In this tutorial,
we'll cover everything essential to using TypeAPI, from setup all the way to deployment, by
building a simple list API.

## Setup

TypeAPI is incredibly simple to set up and doesn't require installing any CLIs, code generators, or
large templates to use. To get a simple TypeAPI app set up, we'll need to do the following:

1. Create a new Bun project by running `bun init`. When asked to name your entry point, enter
   `src/index.ts`
2. Install TypeAPI and TypeBox (`bun add @antribute/typeapi`)
3. Inside your newly created source directory, create the following files: `app.ts`, `routes.ts`,
   and `schemas.ts`
4. Open your `package.json` and add the following to `scripts`: `"dev": "bun --watch src/index.ts"`

Don't worry about leaving these files blank for now, we'll get to filling all of those out very
soon as we build our app.

## Creating Your First Schema

Schemas play a key role in developing typesafe APIs with TypeAPI. To give a few examples, TypeAPI
uses schemas to:

- Define the response typings of your API endpoints
- Strip any unwanted parameters from your API responses
- Create client SDKs for your API
- Validate incoming request data including bodies, headers, path parameters, and query parameters

TypeAPI uses [TypeBox](https://github.com/sinclairzx81/typebox) as the core tooling behind its
schemas. Let's go ahead and add it to our app by running the following command:

```bash
bun add @sinclair/typebox
```

Now that TypeBox is installed, let's go ahead and use it to write our very first schema! Open up
`src/schemas.ts` and add the following line to the top of the file

```ts
import { Type } from '@sinclair/typebox';
```

Now that we have TypeBox imported, it's time to create our first schema: a task for our Todo list.
Our task objects should have the following information:

1. A unique ID
2. The date the task was created
3. The date the task was last updated
4. A title (e.g. "Buy Coffee")
5. A status (e.g. "todo" or "done)
6. An optional description (e.g. "Make sure to buy a light roast and check the roasted on date")

With all of these requirements in mind, let's add our schema to `src/schemas.ts`:

```ts
import { Type } from '@sinclair/typebox';

export const Task = Type.Object({
  id: Type.Number(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
  description: Type.Optional(Type.String()),
  status: Type.String(),
  title: Type.String(),
});
```

We have our first schema, amazing! There's definitely some room for improvement though. To start,
let's narrow the typing of our `status` field a little bit by creating an Enum. This will allow us
to enforce specific values for that field rather than allowing any string to be in there. Let's
go ahead and add an enum to our schema file

```ts
import { Type } from '@sinclair/typebox';

export const TaskStatus = Type.Enum({
  todo: 'todo',
  inProgress: 'in-progress',
  done: 'done',
});

export const Task = Type.Object(/** ... */);
```

Now that we have our `TaskStatus` enum, let's go ahead and wire that up to our `Task` schema:

```tsx
import { Type } from '@sinclair/typebox';

export const TaskStatus = Type.Enum({
  todo: 'todo',
  inProgress: 'in-rogress',
  done: 'done',
});

export const Task = Type.Object({
  id: Type.Number(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
  description: Type.Optional(Type.String()),
  status: TaskStatus,
  title: Type.String(),
});
```

## Creating Some Mock Data

Generally, APIs such as our Todo list API fetch data from a database. We'll absolutely get to that
by the end of this tutorial, but for now, let's create some static, mock data in order to keep
things simple. The last thing we want is to overload you with too much information at once!

With that in mind, let's create a new file called `src/mocks.ts`. We're going to need to import a
couple things in this file:

1. Our newly-created `Task` schema
2. The `Static` typing from TypeBox that allows us to convert our schema into an native TypeScript
   typing

Let's add the following to `src/mocks.ts`

```ts
import type { Static } from '@sinclair/typebox';
import { Task } from './schemas';
```

Now that we have those imports out of the way, let's go ahead and create a new variable called
`MOCK_TASKS` with a type of `Static<typeof Task>[]`:

```ts
import type { Static } from '@sinclair/typebox';
import type { Task } from './schemas';

export const MOCK_TASKS: Static<typeof Task>[] = [];
```

Our variable is set up, fantastic. Let's add some tasks to it:

```ts
import type { Static } from '@sinclair/typebox';
import type { Task } from './schemas';

export const MOCK_TASKS: Static<typeof Task>[] = [
  {
    id: 0,
    createdAt: new Date('06/01/2023'),
    updatedAt: new Date('05/19/2024'),
    status: 'in-progress',
    title: 'Build TypeAPI',
  },
  {
    id: 1,
    createdAt: new Date('01/01/2024'),
    updatedAt: new Date('01/03/2024'),
    status: 'done',
    description: "Let's try to get typeapi.dev before someone takes it",
    title: 'Buy Domain for TypeAPI',
  },
  {
    id: 2,
    createdAt: new Date('05/19/2024'),
    updatedAt: new Date('05/19/2024'),
    description: 'Make sure to buy a light roast and check the roasted on date',
    status: 'todo',
    title: 'Buy Coffee',
  },
];
```

Those are some good looking pieces of mock data! In the next step, let's implement this mock data
and create a route.

## Creating Your First Route

Now that we know what the shape of our data looks like and have a way to validate it, let's go
ahead and get this hooked up to a route so we can actually start serving Todo list data to our
eagerly-awaiting users! In order to do this, we'll first need to create a Route. Routes serve two
main purposes in TypeAPI:

1. Routes implement resolver functions that do the heavy lifting and compute our data
2. Routes allow us to attach those resolver functions and a schema to a URL for apps to consume

Now that we understand why we need to build routes, let's go and build one! The first thing we need
to do is import the `Route` class from TypeAPI. Let's go ahead and add this import to the top of
`src/routes.ts`:

```ts
import { Route } from '@antribute/typeapi';
```

Now that we have that out of the way, it's time to create our route! For this example, let's assume
we want to fetch a single task by its unique ID with a `get` request from the endpoint `tasks/{id}`
{e.g. `tasks/0` or `tasks/1`}. Let's start off by defining our endpoint, method, and an empty
resolver function:

```ts
import { Route } from '@antribute/typeapi';

export const GetTaskById = new Route('/tasks/:taskId', 'get', () => ({ body: {} }));
```

Let's break this route code down a little bit:

1. `new Route()` creates a new instance of the TypeAPI Route class
2. `/tasks/:taskId` defines the URL that the apps will hit our endpoint from. By prefixing `taskId`
   with a colon, we're telling TypeAPI to turn that part of our URL into a path parameter and
   create a variable that we can use later (we'll dive deeper into this shortly)
3. `() => ({ body: {} })` is our route's resolver. The `body` parameter we're returning is the
   response body that will be returned when our route is called

Now that we have our route set up, let's go ahead and make sure it's fully-typed. We want this
route to only return a single, valid `Task` object, so we'll first need to import `Task` into our
routes file:

```ts
import { Route } from '@antribute/typeapi';
import { Task } from './schemas';

// ...
```

Now that we have our schema imported, let's go ahead and attach it to our route by adding a 4th
parameter to our route constructor. This parameter be: `{ output: { body: Task } }` .Once you add
that parameter, your `src/routes.ts` should look something like this:

```ts
import { Route } from '@antribute/typeapi';
import { Task } from './schemas';

export const GetTaskById = new Route('/tasks/:taskId', 'get', async () => ({ body: {} }), {
  output: { body: Task },
});
```

Immediately you should notice a TypeScript error in your resolver function: this is completely
expected. This error is happening because our resolver's `body` object is not a valid `Task`
object. This is TypeAPI working its magic and ensuring that you (the engineer) are returning the
same type that you're providing to the `output` parameter. Let's go ahead and fix that error by
returning the first object from our mock data we created earlier:

```ts
import { Route } from '@antribute/typeapi';
import { MOCK_TASKS } from './mocks';
import { Task } from './schemas';

export const GetTaskById = new Route(
  '/tasks/:taskId',
  'get',
  async () => ({ body: MOCK_TASKS[0]! }),
  {
    output: { body: Task },
  }
);
```

We got rid of those pesky Type errors, nice! Unfortunately this API endpoint still won't be working
as intended since we're returning the first item in the array every time rather than the item with
a matching ID. Let's fix that by using TypeAPI's path parameter functionality and using the path
parameter as the array's index expression:

```tsx
export const GetTaskById = new Route(
  '/tasks/:taskId',
  'get',
  async ({ path }) => {
    const task = MOCK_TASKS[path.taskId];
    return { body: task };
  },
  {
    output: { body: Task },
  }
);
```

You should notice yet another error after implementing this code (it should be something along the
lines of `types 'number' and 'string' have no overlap.`). This error is occurring because all path
parameters are strings by default. Luckily for us, TypeBox can once again come to the rescue! In
order to make this error go away, we need to tell our `Route` that `:taskId` should be a number,
not a string. Let's go ahead and import TypeBox to `src/routes.ts` and add the following to our
`GetTaskById` route:

```ts
import { Route } from '@antribute/typeapi';
import { Type } from '@sinclair/typebox';
import { MOCK_TASKS } from './mocks';
import { Task } from './schemas';

export const GetTaskById = new Route(
  '/tasks/:taskId',
  'get',
  async ({ path }) => {
    const task = MOCK_TASKS.find(({ id }) => id === path.taskId);
    return { body: task! };
  },
  {
    input: {
      path: {
        taskId: Type.Number(),
      },
    },
    output: { body: Task },
  }
);
```

That's one happy looking TypeScript compiler! There's still a few more things we should do before
this API is ready for prime time though. In the next step we'll talk briefly about errors and how
TypeAPI likes to handle them.

## Handling Errors

TypeAPI encourages your apps to throw errors when something goes wrong rather than silently
handling them. Due to TypeAPI's extensive error handling, thrown Errors will always result in an
error response being returned to the user and never result in server crashes. TypeAPI has two
distinct error concepts:

1. Unexpected errors (e.g. your ORM throws an error because it can't connect to your database)
2. Expected errors (e.g. a user enters an ID for an item that doesn't exist and a 404 is thrown)

In order for TypeAPI to distinguish between expected an unexpected errors, TypeAPI exports a
`ResolverError` class for you to call. This class takes two parameters: a `message` string and a
`status` integer. When a `ResolverError` is thrown, the provided message will be displayed to the
user in the response body and the response's status code will equal the provided status. For
example, if a resolver were to throw `new ResolverError(404, 'Not Found')`, the user would see the
following response with a status of `404`:

```json
{
  "error": {
    "message": "Not Found"
  },
  "status": "error",
  "statusCode": 404
}
```

Now, how does this relate to our todo list example above? If you look at the return statement of
our `GetTaskById` resolver, you'll see that we're returning `{ body: task! }`. The `!` at the end
of that return statement tells the TypeScript compiler "Hey, ignore the fact that this could return
undefined". While there are many cases where this makes sense, this is a very bad practice inside
of TypeAPI given that we're telling users "Hey, you should always expect a `Task` object to be
returned on a successful response". To fix this bad practice, let's throw a `ResolverError` when
task is undefined:

```ts
import { ResolverError, Route } from '@antribute/typeapi';
import { Type } from '@sinclair/typebox';
import { MOCK_TASKS } from './mocks';
import { Task } from './schemas';

export const GetTaskById = new Route(
  '/tasks/:taskId',
  'get',
  async ({ path }) => {
    const task = MOCK_TASKS.find(({ id }) => id === path.taskId);
    if (!task) {
      throw new ResolverError(404, `Task with ID ${path.taskId} Not Found`);
    }
    return { body: task };
  },
  {
    input: {
      path: {
        taskId: Type.Number(),
      },
    },
    output: { body: Task },
  }
);
```

Now that we're appropriately handling errors, our resolver is officially complete! In the next step
we'll be hooking that resolver up to a TypeAPI app and running a server.

## Creating and Starting a TypeAPI Server

We now have two out of the three essential pieces to create a TypeAPI app. The last step is to
add our route to an `App` and start our server! Let's start off by opening up `src/app.ts` and
importing the TypeAPI `App` class:

```ts
import { App } from '@antribute/typeapi';
```

Now that we have our class imported, let's start constructing our app:

```ts
import { App } from '@antribute/typeapi';

export const TodoListApp = new App({});
```

Beautiful! Now that we have our app created, let's import our `GetTaskById` route and add it to
our app's route map

```ts
import { App } from '@antribute/typeapi';

import { GetTaskById } from './routes';

export const TodoListApp = new App({
  routes: {
    GetTaskById,
  },
});
```

Look at that, you have a finished TypeAPI app! Now all that's left to do is to start our server
and test everything. To do this, open up `src/index.ts` and add the following code:

```ts
import { TodoListApp } from './app';

TodoListApp.start();
```

Let's get that server started! In the root of your project, let's run that dev command we created
way back in the setup step by running `bun run dev` in our terminal. Once you run that command,
your console output should look something like this:

```text
✔ TypeAPI Server Started on Port 8000
```

We have a server, let's test everything out and make sure everything is working properly.

## Testing our Server

Now that our servers running we can try making some requests! Let's try grabbing the task with ID
`0` first by navigating to `http://localhost:8000/tasks/0`. You should see a response that looks
something like this:

```json
{
  "id": 0,
  "createdAt": "2023-06-01T07:00:00.000Z",
  "updatedAt": "2024-05-19T07:00:00.000Z",
  "status": "in-progress",
  "title": "Build TypeAPI"
}
```

Now that we've had a successful response, let's see if our error handling is working properly. Try
navigating to `http://localhost:8000/tasks/4`. You should see a response that looks something like
this:

```json
{
  "error": {
    "message": "Not Found",
    "details": "Task with ID 4 Not Found"
  },
  "status": "error",
  "statusCode": 404
}
```

Our implemented `ResolverError`s seem to be working as intended! While we're in error testing mood,
let's see what happens when we provide something that's not a number as our `:taskId` parameter.
Try navigating to `http://localhost:8000/tasks/f`. You should see a response that looks something
like this:

```json
{
  "error": {
    "message": "Unprocessable Content",
    "details": "The following validation errors were found in your Path Parameters: taskId: Expected number (Received value \"f\" of type string)"
  },
  "status": "error",
  "statusCode": 422
}
```

## Adding More Routes

Now that we have a basic understanding of TypeAPI, let's create some more routes! Let's create a
route that gets a list of all of our tasks. The first thing we'll need to do is create a new schema
to output an array of `Task` objects rather than a single `Task`. In `src/schema.ts` add:

```ts
export const Tasks = Type.Array(Task);
```

That was easy! Let's build a route to hook this schema up. In `src/routes.ts` add:

```ts
// ...
import { Task, Tasks } from './schemas';

export const GetTasks = new Route(
  '/tasks',
  'get',
  () => {
    const tasks = MOCK_TASKS;
    return {
      body: tasks,
    };
  },
  { output: { body: Tasks } }
);
```

Now that we have our route, let's add it to our server. In `src/app.ts` add:

```ts
import { GetTaskById, GetTasks } from './routes';

export const TodoListApp = new App({
  routes: {
    // ...
    GetTasks,
  },
});
```

Let's check our work one last time by navigating to `http://localhost:3000/tasks`. You should see a
response that looks something like:

```json
[
  {
    "id": 0,
    "createdAt": "2023-06-01T07:00:00.000Z",
    "updatedAt": "2024-05-19T07:00:00.000Z",
    "status": "in-progress",
    "title": "Build TypeAPI"
  },
  {
    "id": 1,
    "createdAt": "2024-01-01T08:00:00.000Z",
    "updatedAt": "2024-01-03T08:00:00.000Z",
    "status": "done",
    "description": "Let's try to get typeapi.dev before someone takes it",
    "title": "Buy Domain for TypeAPI"
  },
  {
    "id": 2,
    "createdAt": "2024-05-19T07:00:00.000Z",
    "updatedAt": "2024-05-19T07:00:00.000Z",
    "description": "Make sure to buy a light roast and check the roasted on date",
    "status": "todo",
    "title": "Buy Coffee"
  }
]
```

This is nice, but we can go even further from here. Let's try adding some filtration to this
endpoint so that we can search for tasks by their title. Let's modify our `GetTasks` route to
include a schema for some query string parameters:

```ts
export const GetTasks = new Route(
  '/tasks',
  'get',
  ({ query }) => {
    const tasks = MOCK_TASKS.filter((task) => {
      if (query.title) {
        return task.title.toLowerCase().includes(query.title.toLowerCase());
      }
      return task;
    });
    return {
      body: tasks,
    };
  },
  {
    input: {
      query: {
        title: Type.Optional(Type.String()),
      },
    },
    output: { body: Tasks },
  }
);
```

Now, obviously this is the perfect place to use something like SQL, as manually writing out filter
functions for large sets of data is an absolute nightmare, however this works as an amazing example
of working with query string parameters. Let's test it out by navigating to
`http://localhost:8000/tasks?title=buy`, you should see a response that looks something like:

```json
[
  {
    "id": 1,
    "createdAt": "2024-01-01T08:00:00.000Z",
    "updatedAt": "2024-01-03T08:00:00.000Z",
    "status": "done",
    "description": "Let's try to get typeapi.dev before someone takes it",
    "title": "Buy Domain for TypeAPI"
  },
  {
    "id": 2,
    "createdAt": "2024-05-19T07:00:00.000Z",
    "updatedAt": "2024-05-19T07:00:00.000Z",
    "description": "Make sure to buy a light roast and check the roasted on date",
    "status": "todo",
    "title": "Buy Coffee"
  }
]
```

Looks like our filter worked, nice!
