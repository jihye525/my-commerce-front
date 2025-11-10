import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../types/Product";

type OrderConfirmProps = {
  cartItems: CartItem[];
};

const formatKRW = (n: number) => n.toLocaleString("ko-KR") + "원";

export default function OrderConfirm({ cartItems }: OrderConfirmProps) {
  const navigate = useNavigate();

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + (item.salePrice ?? item.price) * (item.quantity ?? 1),
        0
      ),
    [cartItems]
  );

  const handleConfirm = () => {
    // TODO: 결제 API 연동
    alert("결제가 진행됩니다. (결제 API 연동 예정)");

    // 완료 페이지로 주문 요약 전달 (없어도 동작하도록 완료 페이지에 기본값 있음)
    navigate("/order-complete", {
      state: {
        summary: {
          orderId: `OC-${Date.now()}`, // 예시 주문번호
          amountKRW: totalPrice,
          payMethod: "카드 결제",
          address: "서울특별시 강남구 테헤란로 123",
          etaText: "2025년 11월 10일",
        },
      },
    });
  };

  return (
    <div className="flex min-h-[80vh] items-start justify-center bg-gray-50 px-4 py-8 dark:bg-neutral-950">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          주문 확인
        </h2>

        {/* 주문 상품 */}
        <section className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            주문 상품
          </h3>

          <ul className="flex flex-col gap-3">
            {cartItems.map((item) => {
              const unit = item.salePrice ?? item.price;
              return (
                <li
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 shrink-0 rounded-md object-contain"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.selectedColor} / {item.selectedSize}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      수량: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {formatKRW(unit)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 배송 정보 */}
        <section className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            배송 정보
          </h3>
          <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
            <p>이름: 홍길동</p>
            <p>전화번호: 010-1234-5678</p>
            <p>주소: 서울특별시 강남구 테헤란로 123</p>
          </div>
        </section>

        {/* 결제 금액 */}
        <section className="mb-2">
          <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            결제 금액
          </h3>
          <p className="text-right text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
            총 {formatKRW(totalPrice)}
          </p>
        </section>

        {/* 액션 버튼 */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => navigate("/cart")}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            장바구니로 돌아가기
          </button>
          <button
            onClick={handleConfirm}
            className="w-full rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
