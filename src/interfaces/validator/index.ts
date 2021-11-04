export type Validator = (value: string) => true | string;
export interface ValidationResult {
  valid: boolean;
  message?: string;
}
