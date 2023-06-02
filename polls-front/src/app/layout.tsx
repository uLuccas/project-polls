"use client";
import Header from "@/components/header";
import "./globals.css";

import { ChakraProvider } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
