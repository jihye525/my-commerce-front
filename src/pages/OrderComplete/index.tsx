import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";


type OrderSummary = {
  orderId: string;
  amountKRW: number; // 원화 정수 금액
  payMethod: string;
  address: string;
  etaText: string; // 예: "2025년 11월 10일"
};

type LocationState = {
  summary?: OrderSummary;
};

const formatKRW = (n: number) => n.toLocaleString("ko-KR") + "원";

export default function OrderComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const summary = useMemo<OrderSummary>(() => {
    const s = (location.state as LocationState | null)?.summary;
    return (
      s ?? {
        orderId: "20251106-00123",
        amountKRW: 154000,
        payMethod: "카드 결제",
        address: "서울특별시 강남구 테헤란로 123",
        etaText: "2025년 11월 10일",
      }
    );
  }, [location.state]);

  const handleGoHome = () => navigate("/");
  const handleGoMyPage = () => navigate("/mypage");

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-6 dark:bg-neutral-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          결제가 완료되었습니다
        </h2>

        <div className="mb-7 space-y-2 text-left text-sm leading-7 text-neutral-600 dark:text-neutral-300">
          <p>
            <strong className="mr-2 font-semibold text-neutral-900 dark:text-neutral-100">
              주문번호:
            </strong>
            {summary.orderId}
          </p>
          <p>
            <strong className="mr-2 font-semibold text-neutral-900 dark:text-neutral-100">
              결제금액:
            </strong>
            {formatKRW(summary.amountKRW)}
          </p>
          <p>
            <strong className="mr-2 font-semibold text-neutral-900 dark:text-neutral-100">
              결제수단:
            </strong>
            {summary.payMethod}
          </p>
          <p>
            <strong className="mr-2 font-semibold text-neutral-900 dark:text-neutral-100">
              배송지:
            </strong>
            {summary.address}
          </p>
          <p>
            <strong className="mr-2 font-semibold text-neutral-900 dark:text-neutral-100">
              배송 예정일:
            </strong>
            {summary.etaText}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleGoHome}
            className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            홈으로
          </button>
          <button
            onClick={handleGoMyPage}
            className="flex-1 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            마이페이지로
          </button>
        </div>

        {/* 안내 문구 (선택) */}
        <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
          주문 상세는 마이페이지 &gt; 주문내역에서 확인할 수 있어요.
        </p>
      </div>
    </div>
  );
}
