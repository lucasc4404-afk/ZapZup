import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZapZup | Plataforma Oficial de Gestão Operacional",
  description:
    "Sistema completo para gestão de equipes, donos, responsáveis, escalas, missões, materiais, mídias e comunicação da ZapZup.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}
