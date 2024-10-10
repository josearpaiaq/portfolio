import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'José Arpaia - Software Developer',
  description:
    'Here, José Arpaia, a software developer based in Panamá. Experienced with Javascript technologies like React, Next.js, Node.js and more. I aim to build a great career with the best companies in the world and become part of the technology revolution is already happening. Software developer portfolio for Jose Arpaia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
