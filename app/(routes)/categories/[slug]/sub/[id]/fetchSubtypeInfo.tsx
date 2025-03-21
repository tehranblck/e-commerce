// services/subtypeService.ts

export const fetchSubtypesById = async (typeId: number) => {
    try {
        const response = await fetch(
            `https://admin.raelli.az/api/products/type/${typeId}/`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch subtypes');
        }

        const data = await response.json();
        return data; // Contains subtypes, pagination info, etc.
    } catch (error) {
        console.error('Error fetching subtypes:', error);
        throw error;
    }
};
