// src/components/Cart/Cart.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../types/Product";

type CartProps = {
  cartItems: CartItem[];
  onIncrease: (id: CartItem["id"], color: string, size: string) => void;
  onDecrease: (id: CartItem["id"], color: string, size: string) => void;
  onRemove: (id: CartItem["id"], color: string, size: string) => void;
};

const formatKRW = (n: number) => n.toLocaleString("ko-KR") + "원";

export default function Cart({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
}: CartProps) {
  const navigate = useNavigate();

  // 브랜드별 그룹화
  const groupedByBrand = useMemo(() => {
    return cartItems.reduce<Record<string, CartItem[]>>((acc, item) => {
      (acc[item.brand] ??= []).push(item);
      return acc;
    }, {});
  }, [cartItems]);

  // 총합
  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + (item.salePrice ?? item.price) * (item.quantity ?? 1),
        0
      ),
    [cartItems]
  );

  const isEmpty = Object.keys(groupedByBrand).length === 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">장바구니</h2>

      {isEmpty ? (
        <p className="text-gray-600">장바구니가 비어 있습니다.</p>
      ) : (
        Object.entries(groupedByBrand).map(([brand, items]) => {
          // 상품(id)별 그룹화
          const groupedByProduct = items.reduce<Record<string, CartItem[]>>(
            (acc, item) => {
              const key = String(item.id);
              (acc[key] ??= []).push(item);
              return acc;
            },
            {}
          );

          return (
            <section key={brand} className="mb-10">
              <h3 className="mb-3 border-b-2 border-gray-100 pb-2 text-xl font-semibold text-gray-900">
                {brand}
              </h3>

              {Object.entries(groupedByProduct).map(([pid, variations]) => (
                <div
                  key={pid}
                  className="mb-4 rounded-xl bg-gray-50 p-5 shadow-sm"
                >
                  <h4 className="mb-3 text-lg font-semibold">
                    {variations[0]?.name}
                  </h4>

                  {variations.map((item) => {
                    const price = item.salePrice ?? item.price;
                    const totalPrice = price * item.quantity;

                    return (
                      <div
                        className="flex flex-col gap-4 border-t border-gray-200 py-3 first:border-t-0 md:flex-row md:items-start"
                        key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                      >
                        <div className="shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-24 w-24 rounded-md bg-white object-contain md:h-24 md:w-24"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                          {/* 옵션 + 수량 */}
                          <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                            <p className="text-sm text-gray-700">
                              컬러: <b>{item.selectedColor}</b> / 사이즈:{" "}
                              <b>{item.selectedSize}</b>
                            </p>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  onDecrease(
                                    item.id,
                                    item.selectedColor,
                                    item.selectedSize
                                  )
                                }
                                className="h-7 w-7 rounded-md border border-gray-300 text-sm transition hover:bg-gray-100"
                                aria-label="수량 감소"
                              >
                                -
                              </button>
                              <span className="min-w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onIncrease(
                                    item.id,
                                    item.selectedColor,
                                    item.selectedSize
                                  )
                                }
                                className="h-7 w-7 rounded-md border border-gray-300 text-sm transition hover:bg-gray-100"
                                aria-label="수량 증가"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* 가격 + 삭제 */}
                          <div className="flex w-full flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
                            <p className="text-sm font-semibold text-gray-900">
                              {item.salePrice && item.salePrice !== item.price ? (
                                <>
                                  <span className="mr-2 text-gray-400 line-through">
                                    {formatKRW(item.price * item.quantity)}
                                  </span>
                                  <span>{formatKRW(totalPrice)}</span>
                                </>
                              ) : (
                                <span>{formatKRW(totalPrice)}</span>
                              )}
                            </p>

                            <button
                              onClick={() =>
                                onRemove(
                                  item.id,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-600 transition hover:bg-red-500 hover:text-white"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </section>
          );
        })
      )}

      {/* 총합 & 전체 구매 */}
      <div className="mt-8 flex items-center justify-end gap-4 border-t-2 border-gray-200 pt-4 text-lg">
        <p>
          총 합계: <b>{formatKRW(total)}</b>
        </p>
        <button
          className="rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
          onClick={() => navigate("/order-confirm")}
        >
          전체 구매하기
        </button>
      </div>
    </main>
  );
}
