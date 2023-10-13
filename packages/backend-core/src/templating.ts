import handlebars from 'handlebars';

export const populateTemplate = <ParamType extends object>(
  template: string,
  params: ParamType
): string => {
  const compiledTemplate = handlebars.compile(template, { noEscape: true });
  return compiledTemplate(params);
};
