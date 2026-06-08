import Image from "next/image";

type LogoVariant = "full" | "symbol";

interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
  // dark prop は後方互換のために残す（PNG版では使用しない）
  dark?: boolean;
}

export default function Logo({ variant = "full", height = 48, className = "" }: LogoProps) {
  if (variant === "symbol") {
    // logo-symbol.png: 332×310
    const width = Math.round(height * (332 / 310));
    return (
      <Image
        src="/logo-symbol.png"
        alt="YUKUE"
        width={width}
        height={height}
        className={className}
        priority
      />
    );
  }

  // logo.png: 1557×394
  const width = Math.round(height * (1557 / 394));
  return (
    <Image
      src="/logo.png"
      alt="YUKUE 我々が収めた税金の行方"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
