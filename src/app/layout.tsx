"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navv } from "@/components/header";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define routes where you don't want the shared layout
  const noLayoutRoutes = ["/auth/login","/","/auth/signup"];
  const showlayout = !noLayoutRoutes.includes(pathname);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-left"></Toaster>
        {showlayout&&<Navv/> }
        {children}
      </body>
    </html>
  );
}
