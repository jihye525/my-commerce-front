import { useState } from "react";
import { useNavigate } from "react-router-dom";

type WishItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState<WishItem[]>([
    {
      id: 1,
      name: "무선 이어폰",
      price: 99000,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "게이밍 마우스",
      price: 45000,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const handleRemove = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-8 dark:bg-neutral-950">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          내 찜목록
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            찜한 상품이 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="mb-2 h-24 w-24 rounded-lg object-cover"
                />
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </p>
                <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {item.price.toLocaleString("ko-KR")}원
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-300"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
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
