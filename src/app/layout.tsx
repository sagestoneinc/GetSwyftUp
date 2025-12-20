import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwyftUp | Global contractor payouts & billing",
  description:
    "Premium fintech workspace for onboarding contractors, issuing invoices, and paying teams across borders with clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-bg text-text">
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
