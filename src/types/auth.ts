export interface KakaoAccount {
  profile_nickname_needs_agreement: boolean
  has_email: boolean
  email_needs_agreement: boolean
  is_email_valid: boolean
  is_email_verified: boolean
  email: string
}

export interface KakaoProfile {
  id: string
  connected_at: string
  kakao_accountd: KakaoAccount
}

export interface GoogleProfile {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: true
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  locale: string
  iat: number
  exp: number
}

export enum Collection {
  USER = "user",
  TODOS = "todos",
}
