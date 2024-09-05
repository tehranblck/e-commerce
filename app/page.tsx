import Hero from "./components/ui/home/hero";
import Products from "./components/ui/home/products";
import FutureCard from "./components/ui/shared/FutureCard";
import FilteredProductsComponent from "./components/ui/home/filteredProducts";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="pt-[180px] lg:pt-[110px]">
      <Hero/>
      <FilteredProductsComponent/>
      <Products isInforBarVisible={true} searchParams={searchParams}/>
      <FutureCard/>
    </main>
  );
}
