import { AxiosError } from 'axios';
import { XRayError } from './XRayError';

export class TableToJSONError extends Error {
  name = 'TableToJSONError';
  message = '';
  isTableToJSONError = true;
  private error: unknown;

  constructor(error: unknown) {
    super(typeof error === 'string' ? error : (error as Error).message);
    this.error = error;
    Object.setPrototypeOf(this, TableToJSONError.prototype);
  }

  isAxiosError(): boolean {
    if (this.error instanceof AxiosError) return true;
    return false;
  }

  isXRayError(): boolean {
    if (this.error instanceof XRayError) return true;
    return false;
  }
}
