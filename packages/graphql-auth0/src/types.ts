export interface UserContext {
  loggedIn: boolean;
  permissions: string[];
  userId?: string;
}
