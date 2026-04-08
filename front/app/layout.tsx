import './globals.css';
import type { Metadata } from 'next';
import { Inter, Archivo_Black } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap',
});

const archivo = Archivo_Black({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-display', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dylan LE — Développeur Cybersécurité',
  description: 'Portfolio de Dylan LE, développeur spécialisé cybersécurité, disponible en alternance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${archivo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}