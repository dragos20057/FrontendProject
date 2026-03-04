export type ObjectType =
  | 'flat'
  | 'house'
  | 'small_office'
  | 'medium_office'

export interface CalculateRequest {
  objectType: ObjectType
  works: string[]
}

export interface CalculateResponse {
  total: number
}