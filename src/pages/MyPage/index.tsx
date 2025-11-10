import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function MyPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile>({
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123",
  });

  const [editing, setEditing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditing(false);
    // TODO: 백엔드 연동 (예: await userApi.updateProfile(user))
    alert("회원 정보가 수정되었습니다. (백엔드 연동 예정)");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-6">
      <div className="w-full max-w-xl">
        <h2 className="mb-6 text-center text-2xl font-bold">마이페이지</h2>

        {/* 프로필 카드 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          {/* 이름 */}
          <div className="mb-4 flex flex-col gap-1.5">
            <label className="text-sm text-neutral-600 dark:text-neutral-300" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              readOnly={!editing}
              className={`rounded-xl border px-3 py-2 text-sm outline-none transition ${
                editing
                  ? "border-neutral-200 bg-white text-neutral-900 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
                  : "border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              }`}
            />
          </div>

          {/* 이메일 (읽기전용) */}
          <div className="mb-4 flex flex-col gap-1.5">
            <label className="text-sm text-neutral-600 dark:text-neutral-300" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              readOnly
              className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            />
          </div>

          {/* 전화번호 */}
          <div className="mb-4 flex flex-col gap-1.5">
            <label className="text-sm text-neutral-600 dark:text-neutral-300" htmlFor="phone">
              전화번호
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={handleChange}
              readOnly={!editing}
              className={`rounded-xl border px-3 py-2 text-sm outline-none transition ${
                editing
                  ? "border-neutral-200 bg-white text-neutral-900 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
                  : "border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              }`}
            />
          </div>

          {/* 주소 */}
          <div className="mb-2 flex flex-col gap-1.5">
            <label className="text-sm text-neutral-600 dark:text-neutral-300" htmlFor="address">
              주소
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={user.address}
              onChange={handleChange}
              readOnly={!editing}
              className={`rounded-xl border px-3 py-2 text-sm outline-none transition ${
                editing
                  ? "border-neutral-200 bg-white text-neutral-900 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
                  : "border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              }`}
            />
          </div>

          {/* 액션 버튼 */}
          <div className="mt-4">
            {editing ? (
              <button
                onClick={handleSave}
                className="w-full rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                저장하기
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                수정하기
              </button>
            )}
          </div>
        </div>

        {/* 링크 섹션 */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => navigate("/orders")}
          >
            주문내역 보기 →
          </button>
          <button
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => navigate("/wishlist")}
          >
            찜목록 보기 →
          </button>
        </div>
      </div>
    </div>
  );
}
