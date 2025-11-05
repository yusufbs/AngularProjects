export interface User {
  idToken: string;
  email: string;
  refreshToken: string;
  expirsIn: string;
  localId: string;
  registered?: boolean;
}
