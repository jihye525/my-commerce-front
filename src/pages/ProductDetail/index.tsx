import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export type Product = {
  id: number | string;
  brand: string;
  name: string;
  price: number;
  salePrice?: number;
  image?: string;         // 단일 대표 이미지
  images?: string[];      // 썸네일/갤러리 이미지
  colors?: string[];
  sizes?: string[];
};

export type AddCartItem = Product & {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

type ProductDetailProps = {
  products: Product[];
  onAdd: (item: AddCartItem) => void;
};

const formatKRW = (n: number) => n.toLocaleString("ko-KR") + "원";

export default function ProductDetail({ products, onAdd }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 선택 상태
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // 제품 탐색 (문자 기준으로 비교해서 id 타입 혼용 안전)
  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [products, id]
  );

  // 이미지 배열 구성
  const images = useMemo<string[]>(
    () => product?.images ?? (product?.image ? [product.image] : []),
    [product]
  );

  // 기본 이미지 선택
  useEffect(() => {
    if (images.length > 0) setSelectedImage(images[0]);
  }, [images]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300"
        >
          ← 돌아가기
        </button>
        <p className="rounded-xl border border-neutral-200 bg-white p-6 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          상품을 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const { brand, name, price, salePrice } = product;
  const isSale = typeof salePrice === "number" && salePrice < price;
  const pct = isSale ? Math.round((1 - (salePrice as number) / price) * 100) : 0;

  const colors = product.colors?.length ? product.colors : ["화이트", "블랙"];
  const sizes = product.sizes?.length ? product.sizes : ["S", "M", "L"];

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("컬러와 사이즈를 선택해주세요.");
      return;
    }
    onAdd({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300"
      >
        ← 돌아가기
      </button>

      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* 썸네일 목록 */}
        <div className="order-2 flex w-full justify-center gap-3 lg:order-1 lg:w-auto lg:flex-col">
          {images.map((img, i) => {
            const active = selectedImage === img;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`h-24 w-20 overflow-hidden rounded-lg border transition hover:opacity-90 md:h-28 md:w-24 ${
                  active
                    ? "border-neutral-900 dark:border-neutral-100"
                    : "border-neutral-200 dark:border-neutral-700"
                }`}
                aria-label={`썸네일 ${i + 1}`}
              >
                <img
                  src={img}
                  alt={`${name}-${i}`}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* 메인 이미지 */}
        <div className="order-1 w-full lg:order-2 lg:w-auto">
          <div className="aspect-[5/6] w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-400">
                이미지 없음
              </div>
            )}
          </div>
        </div>

        {/* 상품 정보 */}
        <aside className="order-3 w-full max-w-sm lg:w-96">
          <h2 className="text-sm text-neutral-500 dark:text-neutral-400">{brand}</h2>
          <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {name}
          </h3>

          {/* 가격 */}
          <div className="mb-4 flex items-center gap-2">
            {isSale ? (
              <>
                <span className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
                  {formatKRW((salePrice as number))}
                </span>
                <span className="text-sm text-neutral-400 line-through">
                  {formatKRW(price)}
                </span>
                <span className="text-base font-bold text-red-600">
                  (-{pct}%)
                </span>
              </>
            ) : (
              <span className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
                {formatKRW(price)}
              </span>
            )}
          </div>

          {/* 옵션 */}
          <div className="mb-4 flex flex-col gap-3">
            {/* 컬러 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-600 dark:text-neutral-300">
                컬러
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
              >
                <option value="">컬러 선택</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* 사이즈 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-600 dark:text-neutral-300">
                사이즈
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
              >
                <option value="">사이즈 선택</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* 수량 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-600 dark:text-neutral-300">
                수량
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-28 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-xl border border-neutral-900 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              장바구니
            </button>
            <button
              type="button"
              onClick={() => alert("구매하기 플로우는 결제 연동 시 구현됩니다.")}
              className="flex-1 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              구매하기
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
