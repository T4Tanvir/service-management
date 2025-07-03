"use server";

import { signIn } from "@/auth";

export async function credentialLogin(formData: {
  password: string;
  phone_number: string;
}) {
  try {
    const response = await signIn("credentials", {
      password: formData.password,
      phone_number: formData.phone_number,
      redirect: false,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes("CredentialsSignin")) {
      return {
        success: false,
        error:
          "Invalid phone number or password. Please check your credentials.",
      };
    }

    return {
      success: false,
      error: "An authentication error occurred. Please try again.",
    };
  }
}
