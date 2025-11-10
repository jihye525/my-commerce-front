import { Link } from "react-router-dom";

type NavbarProps = {
  cartCount: number;
  onLogin: () => void;
};

export default function Navbar({ cartCount, onLogin }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          to="/"
          className="text-lg font-extrabold tracking-tight text-neutral-900 hover:opacity-90 dark:text-neutral-100"
        >
          myCommerce
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLogin}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            로그인
          </button>

          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            장바구니
            <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1.5 text-[11px] font-semibold leading-5 text-white dark:bg-neutral-100 dark:text-neutral-900">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
