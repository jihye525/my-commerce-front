import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormState = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: 실제 Spring Boot 백엔드와 연결
    // 예: await authApi.login({ email: form.email, password: form.password })
    console.log("로그인 시도:", form);
    alert("로그인 성공! (백엔드 연결 예정)");
    navigate("/");
  };

  return (
    <div className="flex min-h-[95vh] items-center justify-center bg-gray-50 px-4 py-6 dark:bg-neutral-950">
      <div className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-7 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          로그인
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-800"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="mt-1 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            로그인
          </button>

          {/* 회원가입 안내 */}
          <p className="mt-1 text-center text-xs text-neutral-500 dark:text-neutral-400">
            계정이 없으신가요?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-semibold text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
            >
              회원가입
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
