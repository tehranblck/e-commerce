export async function fetchProduct(id: number) {
  const res = await fetch(
    `https://e-commerce.saytyarat.com/api/products/${id}/`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}