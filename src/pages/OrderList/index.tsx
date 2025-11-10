import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Order = {
  id: number;
  date: string;
  items: string;
  total: number;
  status: string;
};

export default function OrderList() {
  const navigate = useNavigate();

  // TODO: 실제 주문 데이터는 백엔드 API에서 받아올 예정
  const orders = useMemo<Order[]>(
    () => [
      {
        id: 1,
        date: "2025-11-02",
        items: "블랙 맨투맨, 청바지",
        total: 69000,
        status: "배송 중",
      },
      {
        id: 2,
        date: "2025-10-28",
        items: "화이트 셔츠",
        total: 39000,
        status: "배송 완료",
      },
      {
        id: 3,
        date: "2025-10-28",
        items: "화이트 셔츠",
        total: 39000,
        status: "배송 완료",
      },
    ],
    []
  );

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          주문 내역
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            주문 내역이 없습니다.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
                  <p>
                    <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                      주문일자:
                    </strong>{" "}
                    {order.date}
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                      상품:
                    </strong>{" "}
                    {order.items}
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                      금액:
                    </strong>{" "}
                    {order.total.toLocaleString("ko-KR")}원
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                      상태:
                    </strong>{" "}
                    {order.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate("/mypage")}
          className="mt-6 w-full rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          ← 마이페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
