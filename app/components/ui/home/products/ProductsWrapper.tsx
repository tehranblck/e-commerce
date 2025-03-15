import Products from './index';

const ITEMS_PER_PAGE = 12;
const API_BASE_URL = "https://admin.raelli.az/api";

async function getInitialData() {
    try {
        const [categoriesRes, productsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/products/type/?page_size=20`, {
                next: { revalidate: 3600 }
            }),
            fetch(`${API_BASE_URL}/products/?page=1&page_size=${ITEMS_PER_PAGE}`, {
                next: { revalidate: 3600 }
            })
        ]);

        if (!categoriesRes.ok || !productsRes.ok) {
            throw new Error('Failed to fetch data');
        }

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        return {
            categories: categoriesData.results.map((item: any) => ({
                id: item.id,
                name: item.name,
            })),
            initialProducts: productsData.results,
            totalCount: productsData.count
        };
    } catch (error) {
        console.error("Data loading error:", error);
        return {
            categories: [],
            initialProducts: [],
            totalCount: 0
        };
    }
}

export default async function ProductsWrapper() {
    const data = await getInitialData();

    return (
        <Products
            initialCategories={data.categories}
            initialProducts={data.initialProducts}
            totalCount={data.totalCount}
            isInforBarVisible={true}
        />
    );
} 