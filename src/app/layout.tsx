import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutContainer from "@/components/LayoutContainer";
import "./globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "haysync",
  description: "Shared calendar collaboration scaffold",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen h-screen flex flex-col max-w-7xl mx-auto px-8">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <LayoutContainer>{children}</LayoutContainer>
        </main>
        <Footer />
      </body>
    </html>
  );
}
