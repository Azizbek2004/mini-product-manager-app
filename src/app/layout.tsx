import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Sidebar } from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Product Manager",
  description: "Aesthetic Product Management CRUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50`}>
        <Sidebar />
        <main className="sm:pl-64 min-h-screen">
          <div className="max-w-7xl mx-auto p-6 sm:p-10">
            {children}
          </div>
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
