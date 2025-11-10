import { useNavigate } from "react-router-dom";
import { ProductCardData } from "types/Product";

type ProductCardProps = {
  product: ProductCardData;
  onAdd: (p: ProductCardData) => void;
  onWishToggle?: (id: ProductCardData["id"]) => void; // 선택
};

export default function ProductCard({ product, onAdd, onWishToggle }: ProductCardProps) {
  const { brand, name, price, salePrice, image, id } = product;
  const navigate = useNavigate();
  const fallback = `https://picsum.photos/seed/p${id}/640/480`;
  const isSale = typeof salePrice === "number" && salePrice < price;
  const pct = isSale ? Math.round((1 - (salePrice as number) / price) * 100) : 0;

  const goDetail = () => navigate(`/products/${id}`);

  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
      <button
        type="button"
        onClick={goDetail}
        className="relative w-full h-[260px] overflow-hidden bg-neutral-100 dark:bg-neutral-800"
      >
        <img
          src={image || fallback}
          alt={name}
          loading="lazy"
          onError={(e) => ((e.currentTarget as HTMLImageElement).src = fallback)}
          className="absolute inset-0 h-full w-full object-cover block transition-transform duration-300 group-hover:scale-105"
        />
      </button>

      {/* 정보 */}
      <button
        type="button"
        onClick={goDetail}
        className="cursor-pointer px-3 pb-0 pt-3 text-left"
        aria-label={`${name} 상세로 이동`}
      >
        {brand && (
          <div className="mb-1 text-xs text-neutral-500 dark:text-neutral-400">
            {brand}
          </div>
        )}
        <div
          className="text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2 h-[2.8em] leading-snug"
          title={name}
        >
          {name}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          {isSale ? (
            <>
              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {(salePrice as number).toLocaleString("ko-KR")}원
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {price.toLocaleString("ko-KR")}원
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {price.toLocaleString("ko-KR")}원
            </span>
          )}
        </div>
      </button>

      <div className="mt-3 flex items-center justify-end gap-2 px-3 pb-3">
        <button
          onClick={() => onAdd(product)}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
        >
          장바구니 담기
        </button>
        <button
          aria-label="찜"
          onClick={() => onWishToggle?.(id)}
          className="grid h-9 w-9 place-items-center rounded-xl border border-neutral-300 bg-white text-sm transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
        >
          ♡
        </button>
      </div>
    </li>
  );
}
