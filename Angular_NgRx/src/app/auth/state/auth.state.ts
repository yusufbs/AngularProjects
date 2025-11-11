import { User } from '../../model/user.model';

export interface AuthState {
  user: User | null;
}
export const initialAuthState: AuthState = {
  user: null,
};
