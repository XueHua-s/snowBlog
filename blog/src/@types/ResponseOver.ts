export interface ResponseOver<T> {
  code: number,
  message: string,
  data: T
}
