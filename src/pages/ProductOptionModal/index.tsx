import { useEffect, useState } from "react";
import { Product, CartItem } from "../../types/Product"; 

type ProductOptionModalProps = {
  product?: Product | null;
  onAdd: (item: CartItem) => void;   
  onClose: () => void;
};

export default function ProductOptionModal({
  product,
  onAdd,
  onClose,
}: ProductOptionModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!product) return;
    const defaultColor = product.colors?.[0] ?? "";
    const defaultSize = product.sizes?.[0] ?? "";
    setSelectedColor(defaultColor);
    setSelectedSize(defaultSize);
    setQuantity(1);
  }, [product]);

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const colors = product.colors?.length
    ? product.colors
    : ["Black", "White", "Gray"];
  const sizes = product.sizes?.length ? product.sizes : ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("색상과 사이즈를 선택해주세요!");
      return;
    }
    onAdd({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
    onClose();
  };

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => q + 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-neutral-800/10 bg-white p-6 shadow-2xl transition dark:border-neutral-700 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-3 rounded-full p-1 text-2xl leading-none text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
        >
          ×
        </button>

        {/* Image */}
        <div className="mb-4">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-44 w-full rounded-xl object-contain bg-white dark:bg-neutral-900"
            />
          ) : (
            <div className="flex h-44 w-full items-center justify-center rounded-xl bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
              이미지 없음
            </div>
          )}
        </div>

        {/* Info */}
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {product.name}
        </h2>
        <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">
          {product.brand}
        </p>

        {/* 옵션: 색상 */}
        <div className="mb-3">
          <label className="mb-1 block text-sm text-neutral-600 dark:text-neutral-300">
            색상
          </label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
          >
            <option value="">선택하세요</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* 옵션: 사이즈 */}
        <div className="mb-3">
          <label className="mb-1 block text-sm text-neutral-600 dark:text-neutral-300">
            사이즈
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
          >
            <option value="">선택하세요</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* 수량 */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-600 dark:text-neutral-300">
            수량
          </label>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={dec}
              className="h-8 w-8 rounded-md border border-neutral-300 text-sm transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              aria-label="수량 감소"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              type="button"
              onClick={inc}
              className="h-8 w-8 rounded-md border border-neutral-300 text-sm transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
        </div>

        {/* 담기 버튼 */}
        <button
          onClick={handleAddToCart}
          className="w-full rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
