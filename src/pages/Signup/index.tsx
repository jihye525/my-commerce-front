import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;   // 예: 010-1234-5678
  address: string;
};

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 간단한 클라이언트 검증
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 휴대폰 형식 검사 (010-1234-5678)
    if (!/^\d{3}-\d{4}-\d{4}$/.test(form.phone)) {
      alert("전화번호 형식이 올바르지 않습니다. 예) 010-1234-5678");
      return;
    }

    // TODO: 백엔드 연동 (예: await authApi.signup(form))
    console.log("회원가입 요청:", form);
    alert("회원가입 완료! (백엔드 연결 예정)");
    navigate("/login");
  };

  return (
    <div className="flex min-h-[95vh] items-center justify-center bg-gray-50 px-4 py-6 dark:bg-neutral-950">
      <div className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-7 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          회원가입
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 이름 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-neutral-600 dark:text-neutral-300">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력하세요"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
            />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-neutral-600 dark:text-neutral-300">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-neutral-600 dark:text-neutral-300">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              최소 8자, 대/소문자·숫자·특수문자 조합을 권장합니다.
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm text-neutral-600 dark:text-neutral-300">
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
            />
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm text-neutral-600 dark:text-neutral-300">
              전화번호
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="010-1234-5678"
              value={form.phone}
              onChange={handleChange}
              required
              inputMode="numeric"
              pattern="\d{3}-\d{4}-\d{4}"
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
            />
          </div>

          {/* 주소 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="address" className="text-sm text-neutral-600 dark:text-neutral-300">
              주소
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="주소를 입력하세요"
              value={form.address}
              onChange={handleChange}
              required
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="mt-1 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            회원가입
          </button>

          {/* 로그인 링크 */}
          <p className="mt-1 text-center text-xs text-neutral-500 dark:text-neutral-400">
            이미 계정이 있으신가요?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
            >
              로그인
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
