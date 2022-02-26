export interface CurrentUser {
  roles?: Array<string>
  id?: number
  address?: string
  email?: string
  phone_number?: string
  user_type?: 'admin' | 'customer'
}

export interface AuthContextInterface {
  loading: boolean
  isAuthenticated: boolean
  currentUser: null | CurrentUser
  userMetadata: null | any
  logIn(options?: unknown): Promise<any>
  logOut(options?: unknown): Promise<any>
  signUp(options?: unknown): Promise<any>
  getToken(): Promise<null | string>
  /**
   * Fetches the "currentUser" from the api side,
   * but does not update the current user state.
   **/
  getCurrentUser(): Promise<null | CurrentUser>
  /**
   * Checks if the "currentUser" from the api side
   * is assigned a role or one of a list of roles.
   * If the user is assigned any of the provided list of roles,
   * the hasRole is considered to be true.
   **/
  hasRole(role: string | string[]): boolean
  /**
   * Redetermine authentication state and update the state.
   */
  reauthenticate(): Promise<void>
  forgotPassword(username: string): Promise<any>
  resetPassword(options?: unknown): Promise<any>
  validateResetToken(resetToken: string | null): Promise<any>
  /**
   * A reference to the client that you passed into the `AuthProvider`,
   * which is useful if we do not support some specific functionality.
   */
  client?: any
  type?: any
  hasError: boolean
  error?: Error
}
