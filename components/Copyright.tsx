/**
 * サイト共通の著作権表記。運営会社サイトへリンクする。
 */
export default function Copyright({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      © {new Date().getFullYear()}{" "}
      <a
        href="https://united-futures.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-slate-700 transition-colors"
      >
        UNITED FUTURES, INC.
      </a>
    </span>
  );
}
