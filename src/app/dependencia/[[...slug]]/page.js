import NavbarLogin from '@/components/NavbarLogin';
import FormDependencia from '@/views/Client/projectRegistration/FormDependencia';
import PrivateRoute from '@/routes/PrivateRoute';

export default function DependenciaPage() {
  return (
    <PrivateRoute allowedGroups={['cliente']}>
      <NavbarLogin />
      <FormDependencia />
    </PrivateRoute>
  );
}
