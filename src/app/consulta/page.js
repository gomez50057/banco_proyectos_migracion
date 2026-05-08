import NavbarLogin from '@/components/NavbarLogin';
import ClientProjects from '@/views/Client/projectRegistration/ClientProjects';
import PrivateRoute from '@/routes/PrivateRoute';

export default function ConsultaPage() {
  return (
    <PrivateRoute allowedGroups={['cliente']}>
      <NavbarLogin />
      <ClientProjects />
    </PrivateRoute>
  );
}
