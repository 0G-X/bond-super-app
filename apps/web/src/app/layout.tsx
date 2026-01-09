import type { Metadata } from "next";
import { ColorSchemeScript } from "@bond/ui";
import { RootProvider } from "../providers";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Bond",
  description: "Bond Super App - Trade, Swap, Lend on 0G",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0d0d0d",
          minHeight: "100vh",
        }}
      >
        <RootProvider>
          <Header />
          <main>{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
