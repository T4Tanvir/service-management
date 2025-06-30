/**
 * Custom Error class to send meaningful responses to the client from the service layer.
 */
class ClientError {
  message: string;
  data?: Record<string, unknown>;

  constructor(message: string, data?: Record<string, unknown> | null) {
    this.message = message;
    if (data) {
      this.data = data;
    }
  }

  /**
   * Returns an error for invalid input data.
   * @param msg Optional custom message.
   */
  static invalidError(msg?: string): ClientError {
    return new ClientError(msg ?? "The provided information is invalid");
  }

  /**
   * Returns an error for an incorrect password.
   */
  static wrongPassword(): ClientError {
    return new ClientError("The password is incorrect");
  }

  /**
   * Returns an error for invalid login credentials.
   */
  static invalidCredentials(): ClientError {
    return new ClientError("The phone number or password is incorrect");
  }

  /**
   * Returns an error for an inactive user account.
   */
  static inactiveUser(): ClientError {
    return new ClientError("This user account is not active");
  }

  /**
   * Returns an error for a duplicate email or username.
   */
  static duplicateEmailError(): ClientError {
    return new ClientError("Duplicate username. Please provide a new username");
  }

  /**
   * Returns an error for a resource that does not exist.
   * @param name Optional resource name to include in the message.
   */
  static notExistsError(name = ""): ClientError {
    return new ClientError(
      name ? `${name} does not exist` : "Resource does not exist"
    );
  }

  /**
   * Returns an error for denied access.
   */
  static accessDeniedError(): ClientError {
    return new ClientError(
      "Sorry, you do not have permission to access this resource"
    );
  }
}

export { ClientError };
