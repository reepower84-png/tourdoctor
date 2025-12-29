import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "투어닥터 - 제주도 & 해외 여행상품권 전문",
  description: "제주도 여행상품권, 해외 여행상품권 전문 판매. 합리적인 가격으로 특별한 여행을 선물하세요. 기업 복지, 경품, 선물용으로 최고의 선택!",
  keywords: "여행상품권, 제주도여행상품권, 해외여행상품권, 기프트카드, 제이코리아, 투어닥터",
  openGraph: {
    title: "투어닥터 - 제주도 & 해외 여행상품권 전문",
    description: "제주도 여행상품권, 해외 여행상품권 전문 판매. 합리적인 가격으로 특별한 여행을 선물하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
