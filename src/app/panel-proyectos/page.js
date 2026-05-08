import DashboardClient from '@/views/Client/dashboard/DashboardClient';
import PrivateRoute from '@/routes/PrivateRoute';

export default function PanelProyectosPage() {
  return (
    <PrivateRoute allowedGroups={['cliente']}>
      <DashboardClient />
    </PrivateRoute>
  );
}
