import type { AuthOptions } from 'next-auth';
import { unstable_getServerSession } from 'next-auth/next';
import type { BaseServerContext, UserContext } from './types';

export interface CreateNextAuthContextParams<AdditionalContext extends Record<string, unknown>> {
  additionalContext?: AdditionalContext;
  authOptions: AuthOptions;
  getUserPerms: (email: string) => string[] | Promise<string[]>;
}

function createNextAuthContext<
  ServerContext extends BaseServerContext,
  AdditionalContext extends Record<string, unknown>
>({
  additionalContext,
  authOptions,
  getUserPerms,
}: CreateNextAuthContextParams<AdditionalContext>) {
  const LOGGED_OUT = { loggedIn: false, permissions: [] };
  return async ({ req, res }: ServerContext): Promise<UserContext> => {
    // This rule is trigged as a side effect of allowing ServerContext to be any. See types.ts for
    // why we're breaking our "no any" rules here
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session?.user?.email?.length) {
      return { ...additionalContext, ...LOGGED_OUT };
    }

    const userId = session.user.email;
    const permissions = await getUserPerms(userId);

    return {
      ...additionalContext,
      loggedIn: true,
      permissions,
      userId,
    };
  };
}

export default createNextAuthContext;
