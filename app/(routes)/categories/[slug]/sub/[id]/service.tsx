// services/productService.ts

export const fetchCategoryData = async (typeId: number) => {
    try {
        const response = await fetch(`https://api.muslimanshop.com/api/products/?sub_type=${typeId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch category data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching category data:", error);
        throw error;
    }
};

// export const fetchProductsByCategory = async (typeId: number) => {
//     try {
//         const response = await fetch(`https://api.muslimanshop.com/api/products/?sub_type=1`);
//         if (!response.ok) {
//             throw new Error("Failed to fetch products data");
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching products data:", error);
//         throw error;
//     }
// };
