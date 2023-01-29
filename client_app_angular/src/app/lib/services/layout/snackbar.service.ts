import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiError, ApiErrorMessagesMap, ConstraintViolationNameToMessageMap} from "../../types/Error.types";

export type AppError = {
  message: string;
  type: string;
  timeout?: number;
  severity?: 'error' | 'warning' | 'info' | 'success';
  link?: string,
  linkText?: string,
  additionalInfo?: Map<string, string>
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  errors: BehaviorSubject<Map<number, AppError>> = new BehaviorSubject<Map<number, AppError>>(new Map<number, AppError>());
  currentErrorCount: number = 0;
  constructor() { }

  addMessage(error: AppError) {
    this.currentErrorCount++;
    this.errors.next(this.errors.value.set(this.currentErrorCount, error));
    if(error.timeout) {
      setTimeout(() => {
        this.removeError(this.currentErrorCount);
      }, error.timeout)
    }
  }

  removeError(index: number) {
    const errors = this.errors.value;
    errors.delete(index);
    this.errors.next(errors);
  }

  handleError(httpError: HttpErrorResponse) {
    const error = httpError.error as ApiError;

    const displayMessage = ApiErrorMessagesMap.get(error.message) || 'Unknown error';
    let additionalInfo = new Map<string, string>();
    if (error.message === 'CONSTRAINT_VIOLATION' && error.errors) {
      Object.entries(error.errors).forEach((value) => {
        additionalInfo.set(value[0], ConstraintViolationNameToMessageMap.get(value[1]) || 'Unknown error')
      })
    }

    this.addMessage({
      message: displayMessage,
      type: 'error',
      severity: 'error',
      additionalInfo
    })
  }
}
