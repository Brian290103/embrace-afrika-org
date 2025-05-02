"use server";

import { auth } from "@/lib/auth";

export const signIn = async (email, password) => {
  await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
    },
  });
};
export const signUp = async (email, password) => {
  await auth.api.signUpEmail({
    body: {
      email: email,
      password: password,
      name: "EmbraceAfrika",
    },
  });
};
