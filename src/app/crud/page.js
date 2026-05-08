import NavbarLogin from '@/components/NavbarLogin';
import CRUDTable from '@/views/Responsible/projectRegistration/CRUDTable';
import PrivateRoute from '@/routes/PrivateRoute';

export default function CrudPage() {
  return (
    <PrivateRoute allowedGroups={['responsable']}>
      <NavbarLogin />
      <CRUDTable />
    </PrivateRoute>
  );
}
