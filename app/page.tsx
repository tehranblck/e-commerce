import Hero from "./components/ui/home/hero";
import Products from "./components/ui/home/products";
import FutureCard from "./components/ui/shared/FutureCard";

export default function Home() {
  return (
    <main className="pt-[180px] lg:pt-[110px]">
      <Hero/>
      <Products isInforBarVisible={true}/>
      <FutureCard/>
    </main>
  );
}
