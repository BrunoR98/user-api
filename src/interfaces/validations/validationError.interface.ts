export interface IValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}
