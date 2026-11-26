export interface IResponsePayload<T> {
  data: T;
  message: string;
  status: number;
}
