import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOPE Assessment Application",
  description: "Hospice Outcomes and Patient Evaluation (HOPE) v1.01 - CMS-Compliant Assessment Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
