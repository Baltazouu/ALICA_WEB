import { Inter } from "next/font/google";
import "./(style)/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Alica',
  description: 'Application pour les enseignants et les anciens et les nouveaux élèves',
  icons: {
    icon: ['/favicon.ico?v=4'],
    appleIcon: ['/apple-touch-icon.png?v=4'],
    appleStartupIcon: ['/apple-touch-icon.png'],
    androidIcon: ['/android-chrome-192x192.png'],
    androidStartupIcon: ['/android-chrome-192x192.png'],
    msStartupIcon: ['/mstile-150x150.png'],
  },
  searchIcon: {
    url: '/favicon.ico?v=4',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
