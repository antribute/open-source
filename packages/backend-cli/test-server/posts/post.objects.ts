import builder from '../generated/builder';

export const OrganizationRef = builder.prismaObject('Post', {
  description: 'A group of flags, projects, rules, etc. that is shared between one or more users',
  fields: (t) => ({
    id: t.exposeInt('id'),
    description: t.exposeString('description', { nullable: true }),
    name: t.exposeString('title'),
  }),
  name: 'Post',
});
