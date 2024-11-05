import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Teste Codako",
  description: "Teste NestJs, NextJs e Graphql",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
