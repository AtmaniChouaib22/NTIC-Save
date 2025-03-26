export type UserFormData = {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type SignUpParams = {
  formData: UserFormData;
};

export type SignUpResult = {
  success: boolean;
  userId?: string;
  message: string;
  error?: Error;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignInParams = {
  logFormData: LoginFormData;
};

export type SignInResult = {
  success: boolean;
  message: string;
  error?: Error;
};