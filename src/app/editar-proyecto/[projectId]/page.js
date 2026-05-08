import NavbarLogin from '@/components/NavbarLogin';
import EditProject from '@/views/Client/projectRegistration/EditProject';
import PrivateRoute from '@/routes/PrivateRoute';

export default function EditarProyectoPage() {
  return (
    <PrivateRoute allowedGroups={['cliente']}>
      <NavbarLogin />
      <EditProject />
    </PrivateRoute>
  );
}
