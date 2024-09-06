export const loginUser = async (loginData: { email: string; password: string }) => {
    const response = await fetch("https://api.muslimanshop.com/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  
    return response.json(); // returns token and first name
  };
  
  export const fetchUserProfile = async (token: string) => {
    const response = await fetch("https://api.muslimanshop.com/api/user/profile/", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
  
    return response.json(); 
  };
  