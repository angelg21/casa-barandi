'use server';

import { FormValues } from "../interfaces/FormTemplateProps";

export const registerUser = async (values: FormValues) => {
  const res = await fetch(process.env.API_URL + "/auth/register", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: values.name,
        email: values.email,
        password: values.password,
      }),
  });

  if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al registrar el usuario.");
  }
};