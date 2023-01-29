export type ApiError = {
  message: string;
  status: number;
  errors: Map<string, string>;
}

export const ApiErrorMessagesMap: Map<string, string> = new Map<string, string>([
  ["UNAUTHORIZED", "You are not authorized to perform this action"],
  ["FAILED_TO_SEND_EMAIL", "Failed to send email"],
  ["USER_NOT_FOUND", "User not found"],
  ["CONSTRAINT_VIOLATION", "Constraint violation"]
]);

export const ConstraintViolationNameToMessageMap: Map<string, string> = new Map<string, string>([
  ["user_email_unique", "Email already exists"],
  ["user_username_unique", "Username already exists"]
]);

