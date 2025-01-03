export const fetchProductsByCategory = async (page: number, category: string) => {
  try {
    // Dinamik URL oluşturma
    const url = `https://e-commerce.saytyarat.com/api/products/?type=${category}&page=${page}`;

    const response = await fetch(url);


    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
