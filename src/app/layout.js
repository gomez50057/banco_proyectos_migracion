import localFont from "next/font/local";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import "@/components/styles.css";
import "@/components/Dashboard.css";
import "@/components/Preloader.css";
import "@/components/UserOptionsModal.css";
import "@/views/Client/panel/ClientPanel.css";
import "@/views/Client/investmentBudget/CedulaRegistroForm.css";
import "@/views/FrontPage/mapa/InteractiveMap.css";
import "@/views/FrontPage/faq/FAQ.css";
import "@/views/FrontPage/faq/Header.css";
import "@/views/Responsible/projectRegistration/CRUDTable.css";
import "@/views/Responsible/projectRegistration/ProjectDialog.css";
import "@/views/Responsible/projectRegistration/ProjectReportReact.css";
import "@/views/Responsible/investmentBudget/InvestmentReport.css";
import Providers from "./providers";
import AppShell from "./app-shell";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BANCO DE PROYECTOS HIDALGO",
  description: "Banco de Proyectos Hidalgo",
  icons: {
    icon: "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/favicon.ico",
    shortcut: "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/favicon.ico",
    apple: "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
