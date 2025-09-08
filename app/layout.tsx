// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Onboarding Form",
  description: "Multi-step form using Next.js, RHF, Zod, Shadcn, Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50 text-gray-900"}>
        <main className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-3 md:p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
