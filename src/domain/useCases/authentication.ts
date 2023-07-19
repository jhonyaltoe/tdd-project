export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  auth (login: AuthenticationModel): Promise<string | null>
}
