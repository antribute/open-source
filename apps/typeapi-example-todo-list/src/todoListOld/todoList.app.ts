import { App } from '@antribute/typeapi';
import { OpenApiPlugin } from '@antribute/typeapi-plugin-openapi';
import { todoListRouter } from './todoList.router';

export const todoListApp = new App({
  plugins: [
    new OpenApiPlugin({
      info: {
        title: 'Todo List',
        description: 'An example todo list app built with TypeAPI!',
        license: { name: 'MIT' },
        version: '1.0.0',
      },
    }),
  ],
  router: todoListRouter,
});
