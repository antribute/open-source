export interface UserContext {
  loggedIn: boolean;
  permissions: string[];
  userId?: string;
}

// As a rule of thumb, we don't allow "any" to be used at Antribute, however we're going to make an
// exception for server context as we want this to be modular and work with any server
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseServerContext = Record<string, any>;
