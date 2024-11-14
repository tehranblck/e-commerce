export const fetchProductsByCategory = async (page: number, category: string) => {
  try {
    // Dinamik URL oluşturma
    console.log('first')
    const url = `https://api.muslimanshop.com/api/products/?type=${category}&page=${page}`;

    const response = await fetch(url);


    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    // `results` anahtarındaki ürün listesini döndür
    return data.results;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
