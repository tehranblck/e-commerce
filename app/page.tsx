"use client"
import Hero from "./components/ui/home/hero";
import Products from "./components/ui/home/products";
import FutureCard from "./components/ui/shared/FutureCard";
import FilteredProductsComponent from "./components/ui/home/filteredProducts";
import ChatBot from "./components/ChatWindow";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="relative">
      <FilteredProductsComponent />

      <Hero />
      <Products isInforBarVisible={true} />
      <FutureCard />
      <ChatBot />

    </main>
  );
}
