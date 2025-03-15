import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar, { SidebarProvider } from "@/components/Sidebar";
import { ThemeProvider } from "./providers";
import MainContent from "@/components/MainContent";
import { Providers } from './providers';
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "HRM System",
  description: "Human Resource Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className={inter.className}>
      <body className="overflow-x-hidden">
        <Providers>
          <ThemeProvider>
            {session ? (
              <SidebarProvider>
                <Sidebar />
                <MainContent>{children}</MainContent>
              </SidebarProvider>
            ) : (
              children
            )}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
