export interface ResponseData {
  error: Error
  meta?: Meta
}

export interface Error {
  message: string
}

export interface Meta {
  timestamp: string
  path: string
}
