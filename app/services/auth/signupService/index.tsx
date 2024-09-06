import { UserRegister } from "@/app/models/auth/UserRegister";

export const registerUser = async (formData: UserRegister) => {
  const response = await fetch(
    "https://api.muslimanshop.com/api/user/register/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register user");
  }

  return response.json();
};
