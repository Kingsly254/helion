import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HotPot ISP - Internet Service Provider',
  description: 'Premium internet services with flexible packages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
