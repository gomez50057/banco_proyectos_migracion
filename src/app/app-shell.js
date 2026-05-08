'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

const hideFooterPatterns = [
  /^\/project-report-react\/[^/]+\/?$/,
  /^\/reporte-inversion\/[^/]+\/?$/,
];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const shouldHideFooter = hideFooterPatterns.some((pattern) => pattern.test(pathname));

  return (
    <>
      {children}
      {!shouldHideFooter && <Footer />}
    </>
  );
}
