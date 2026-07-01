import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, textAlign: "center", padding: "0 24px" }}>
      <span className="eyebrow">404</span>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>That page doesn&apos;t exist.</h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: 420 }}>
        The page or service you&apos;re looking for isn&apos;t here. Head back
        home or browse our services.
      </p>
      <Link
        href="/"
        style={{
          marginTop: 10,
          padding: "14px 26px",
          borderRadius: 999,
          background: "var(--grad-prism)",
          color: "#07070a",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
