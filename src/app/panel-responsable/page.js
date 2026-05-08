import DashboardResponsible from '@/views/Responsible/dashboard/DashboardResponsible';
import PrivateRoute from '@/routes/PrivateRoute';

export default function PanelResponsablePage() {
  return (
    <PrivateRoute allowedGroups={['responsable']}>
      <DashboardResponsible />
    </PrivateRoute>
  );
}
