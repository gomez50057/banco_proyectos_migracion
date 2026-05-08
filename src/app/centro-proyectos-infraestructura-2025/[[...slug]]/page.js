import NavbarLogin from '@/components/NavbarLogin';
import FormcentroProyectos from '@/views/Client/centroProyectosInfraestructura2025/FormDependencia';
import PrivateRoute from '@/routes/PrivateRoute';

export default function CentroProyectosInfraestructuraPage() {
  return (
    <PrivateRoute allowedGroups={['proyectos-infraestructura-2025']}>
      <NavbarLogin />
      <FormcentroProyectos />
    </PrivateRoute>
  );
}
