export interface tokenPayload {
  id: string,
  role: 'admin' | 'user',
  iat: number,
  exp: number
}
