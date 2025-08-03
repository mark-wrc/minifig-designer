export interface AuthConfig {
  storagePrefix?: string;
  redirectUrl?: string;
  parameterMap?: Record<string, string>;
  requiredFields?: string[];
  autoRedirect?: boolean;
}

export interface IUser {
  userName: string;
  userEmail: string;
  imageUrl?: string;
  token: string;
}

export interface AuthData {
  [key: string]: string | undefined;
  token?: string;
}

export interface AuthHookResult {
  authData: { user: IUser } | null;
  isLoading?: boolean;
  clearAuthData: () => void;
  isAuthenticated: boolean;
}
