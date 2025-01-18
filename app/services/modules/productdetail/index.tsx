export async function fetchProduct(id: number) {
  const res = await fetch(
    `https://admin.raelli.az/api/products/${id}/`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}