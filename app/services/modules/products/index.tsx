export async function fetchProducts(page: number, pageSize: number = 10) {
    const baseUrl = 'https://api.muslimanshop.com/api/products';
    const url = new URL(baseUrl);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('page_size', pageSize.toString());
  
    const res = await fetch(url.toString(), {
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
  
    return res.json();
  }
  