'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ProjectDataGrid, { renderTextCell } from '@/shared/components/ProjectDataGrid';
import ProjectRowActions from '@/shared/components/ProjectRowActions';
import { getInvestmentProjects } from '@/shared/api/investmentApi';
import { normalizeArrayResponse, sortByNewest } from '@/shared/utils/normalizeApiResponse';
import { useRouter } from 'next/navigation';

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getInvestmentProjects();
        const projectRows = sortByNewest(normalizeArrayResponse(response.data));
        setProjects(projectRows.map((project) => ({
          id: project.projInvestment_id,
          projInvestment_id: project.projInvestment_id,
          fecha_registro: project.fecha_registro || 'N/A',
          nombre_proyecto: project.nombre_proyecto || 'N/A',
          is_blocked_project: Boolean(project.is_blocked_project),
        })));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const columns = useMemo(() => [
    {
      field: 'projInvestment_id',
      headerName: 'ID del Proyecto',
      flex: 0.9,
      minWidth: 170,
      renderCell: renderTextCell,
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha de Creación',
      flex: 0.8,
      minWidth: 160,
      renderCell: renderTextCell,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre del Proyecto',
      flex: 1.5,
      minWidth: 280,
      renderCell: renderTextCell,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      sortable: false,
      filterable: false,
      width: 140,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <ProjectRowActions
          isBlocked={params.row.is_blocked_project}
          status={params.row.nombre_proyecto}
          onEdit={() => router.push(`/editar-proyecto-inversion/${params.row.projInvestment_id}`)}
        />
      ),
    },
  ], [router]);

  return (
    <ProjectDataGrid
      title="Proyectos de Inversión Registrados"
      rows={projects}
      columns={columns}
      loading={loading}
      className="table_grid_pro"
    />
  );
};

export default ClientProjects;
