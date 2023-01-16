import NextAuth from 'next-auth';

import authProviders from 'authProviders';

export default NextAuth({
  providers: authProviders,
});
