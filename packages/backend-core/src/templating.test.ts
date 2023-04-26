import { describe, expect, it } from 'vitest';

import { populateTemplate } from './templating';

interface TemplateParams {
  user: {
    firstName: string;
  };
}

describe('templating', () => {
  describe('populateTemplate', () => {
    it('should render a handlebars template with the appropriate data', () => {
      const template = `Hello, {{user.firstName}}!`;
      const params = { user: { firstName: 'James' } };
      const populatedTemplate = populateTemplate<TemplateParams>(template, params);
      expect(populatedTemplate).toBe('Hello, James!');
    });
  });
});
