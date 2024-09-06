export const fetchProductsByCategory = async (page: number, category: string) => {
    try {
      const response = await fetch(
        `https://api.muslimanshop.com/api/products?page=${page}&page_size=100`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
  
      const data = await response.json();
      const filteredProducts = data.results.filter(
        (product: any) => product.type === category
      );
  
      return filteredProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  