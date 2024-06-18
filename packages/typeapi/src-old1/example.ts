import { Type } from '@sinclair/typebox';

import { App } from './app';
import { Func } from './func';
import { RestPlugin } from './plugins/typeapi-plugin-rest';

const TodoModel = Type.Object({
  id: Type.String(),
  isDone: Type.Boolean(),
  title: Type.String(),
});

const TodoCreateModel = Type.Pick(TodoModel, ['title']);

const createTodo = new Func(
  TodoModel,
  (input) => ({ id: 'foo', isDone: false, title: input.title }),
  TodoCreateModel
);

const app = new App({
  funcs: {
    createTodo,
  },
  plugins: [new RestPlugin()],
});
// app.startServer();

app.startServer();
