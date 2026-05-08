'use client';

import dynamic from 'next/dynamic';

const DashboardInvestment = dynamic(
  () => import('@/views/visualizer/dashboard/DashboardInvestment'),
  { ssr: false }
);

export default function PanelAdminPage() {
  return <DashboardInvestment />;
}
