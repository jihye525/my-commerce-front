import { ProductCardData } from "types/Product";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: ProductCardData[];
  addToCart: (p: ProductCardData) => void;
};

export default function ProductList({ products, addToCart }: ProductListProps) {
  console.log("[ProductList] card grid rendering");
  return (
    <section className="mx-auto max-w-screen-lg py-6">
      <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
        상품 목록
      </h2>

      {products.length === 0 ? (
        <p className="rounded-xl border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
          표시할 상품이 없습니다.
        </p>
      ) : (
        <ul className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </ul>
      )}
    </section>
  );
}
