// services/balanceService.ts

export const increaseBalance = async (
    selectedFile: File,
    amount: string,
    token: string
  ) => {
    const formData = new FormData();
    formData.append("receipt_image", selectedFile);
    formData.append("claimed_amount", amount);
  
    const response = await fetch("https://api.muslimanshop.com/api/user/balance/add/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to upload the image.");
    }
  
    return response;
  };
  