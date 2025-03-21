// services/productService.ts

export const fetchCategoryData = async (
    subtypeId: number,
    typeId: number,
    page: number = 1
) => {
    try {
        const response = await fetch(
            `https://admin.raelli.az/api/products/?page_size=10&page=${page}&sub_type=${subtypeId}&type=${typeId}`
        );

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
//         const response = await fetch(`https://admin.raelli.az/api/products/?sub_type=1`);
//         if (!response.ok) {
//             throw new Error("Failed to fetch products data");
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching products data:", error);
//         throw error;
//     }
// };
