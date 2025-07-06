export interface UserFormData {
  full_name: string;
  phone_number: string;
  email: string;
  city: string;
  address: string;
  role: string;
}

export interface ChangePasswordData {
  newPassword: string;
  confirmPassword: string;
}
