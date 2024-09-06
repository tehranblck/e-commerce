export const sendResetPasswordEmail = async (email: string) => {
    const formData = { email };
  
    const response = await fetch(
      "https://api.muslimanshop.com/api/user/send-reset-password-email/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send reset email");
    }
  
    return response;
  };
  