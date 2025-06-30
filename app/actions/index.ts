"use server";
import { signIn } from "@/auth";

export async function ceredntialLogin(formData: {
  password: string;
  phone_number: string;
}) {
  try {
    console.log("+========================Credential login=============");
    const response = await signIn("credentials", {
      password: formData.password,
      phone_number: formData.phone_number,
      redirect: false,
    });
    console.log(response);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    throw new Error(error);
  }
}
