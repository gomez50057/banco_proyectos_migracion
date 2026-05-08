import NavbarLogin from '@/components/NavbarLogin';
import ClientPanel from '@/views/Client/panel/ClientPanel';
import PrivateRoute from '@/routes/PrivateRoute';

export default function PanelUsuarioPage() {
  return (
    <PrivateRoute allowedGroups={['cliente']}>
      <NavbarLogin />
      <ClientPanel />
    </PrivateRoute>
  );
}
