import NavbarLogin from '@/components/NavbarLogin';
import EditProjectInvest from '@/views/Client/investmentBudget/EditProjectInvest';
import PrivateRoute from '@/routes/PrivateRoute';

export default function EditarProyectoInversionPage() {
  return (
    <PrivateRoute allowedGroups={['cliente']}>
      <NavbarLogin />
      <EditProjectInvest />
    </PrivateRoute>
  );
}
