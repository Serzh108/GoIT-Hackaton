import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Inter } from 'next/font/google';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Admin panel Team-3',
  description: 'GoIT Hackathon: Admin panel for ІнХармоні.Юа',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased bg-gray-100 `}
      >
        <div className="flex w-full h-full">
          <div className=" w-full h-full flex flex-col items-center ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
