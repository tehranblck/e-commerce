import Hero from "./components/ui/home/hero";
import FutureCard from "./components/ui/shared/FutureCard";
import ProductsWrapper from "./components/ui/home/products/ProductsWrapper";
import ChatBot from "./components/ChatWindow";
import FilteredProductsComponent from "./components/ui/home/filteredProducts";
export default async function Home() {
  return (
    <main className="relative">
      <FilteredProductsComponent />
      <Hero />
      <ProductsWrapper />
      <FutureCard />
      <ChatBot />
    </main>
  );
}
