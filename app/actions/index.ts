"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { msg: "Invalid credentials", success: false };
        case "CredentialsSignin":
          throw error;
        default:
          return { msg: "Something went wrong", success: false };
      }
    }

    throw error;
  }
}
