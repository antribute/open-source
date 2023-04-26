import handlebars from 'handlebars';

export const populateTemplate = <ParamType extends object>(template: string, params: ParamType) => {
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(params);
};
