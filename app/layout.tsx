import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media Fire Tracker",
  description: "Keep the fire burning by publishing content regularly!",
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
