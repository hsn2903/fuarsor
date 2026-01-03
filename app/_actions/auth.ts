"use server";

import { auth } from "@/lib/auth";

// Sign Up
export const signUpWithEmail = async (formData: FormData) => {
  // Get form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // Validate form data
  if (!email || !password || !name) {
    throw new Error("All fields are required");
  }

  // Sign up
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });
    if (response.ok) {
      return true;
    }
    throw new Error("Failed to sign up");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.log(error);
    throw error;
  }
};

// Sign In
export const signInEmailAndPassword = async (formData: FormData) => {
  // Get form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate form data
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  // Sign in
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });
    if (response.ok) {
      return true;
    }
    throw new Error("Failed to sign in");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.log(error);
    throw error;
  }
};

// Sign Out
export const signOut = async () => {
  try {
    await auth.api.signOut();
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.log(error);
    throw error;
  }
};
