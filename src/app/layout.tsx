import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORacle: Surgical Video Intelligence",
  description: "The Operating System for Surgical Judgment. AI-powered search and interactive tutor for the CTSNet Atlas of Cardiac Surgery.",
  openGraph: {
    title: "ORacle",
    description: "Where 50 years of cardiac surgery becomes a conversation.",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#0C2452', minHeight: '100vh' }}>{children}</body>
    </html>
  );
}
