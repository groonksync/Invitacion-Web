import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mis Quince Años | Invitación Digital Interactiva',
  description: 'Invitaciones digitales interactivas para celebraciones de 15 años con confirmación de asistencia en tiempo real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-[#0d0a0f] text-gray-100 selection:bg-rose-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
