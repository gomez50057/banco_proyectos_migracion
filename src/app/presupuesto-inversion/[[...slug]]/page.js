import NavbarLogin from '@/components/NavbarLogin';
import CedulaRegistroForm from '@/views/Client/investmentBudget/CedulaRegistroForm';
import PrivateRoute from '@/routes/PrivateRoute';

export default function PresupuestoInversionPage() {
  return (
    <PrivateRoute allowedGroups={['cliente']}>
      <NavbarLogin />
      <CedulaRegistroForm />
    </PrivateRoute>
  );
}
