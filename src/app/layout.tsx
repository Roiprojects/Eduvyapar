import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Education E-Commerce Platform | EduPlatform (BRD Ver 1.0)",
  description: "Unified digital ecosystem integrating E-Commerce, Recruitment, Pre-Admission Auto-Submission, Shisya Knowledge Feed, and Inter-Institutional Bus Sharing for 50L+ students & 5L+ institutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
