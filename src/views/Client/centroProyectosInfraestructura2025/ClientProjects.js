'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ProjectDataGrid, { renderTextCell } from '@/shared/components/ProjectDataGrid';
import ProjectRowActions from '@/shared/components/ProjectRowActions';
import { getUserProjectsTable } from '@/shared/api/projectsApi';
import { normalizeArrayResponse, sortByNewest } from '@/shared/utils/normalizeApiResponse';
import { useRouter } from 'next/navigation';

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getUserProjectsTable();
        const projectRows = sortByNewest(normalizeArrayResponse(response.data));
        setProjects(projectRows.map((project) => ({
          id: project.project_id,
          project_id: project.project_id,
          fecha_registro: project.fecha_registro || 'N/A',
          nombre_proyecto: project.nombre_proyecto || 'N/A',
          estatus: project.estatus || 'N/A',
          isBlocked_project: Boolean(project.isBlocked_project),
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
      field: 'project_id',
      headerName: 'ID del Proyecto',
      flex: 0.9,
      minWidth: 170,
      renderCell: renderTextCell,
    },
    {
      field: 'nombre_proyecto',
      headerName: 'Nombre del Proyecto',
      flex: 1.5,
      minWidth: 260,
      renderCell: renderTextCell,
    },
    {
      field: 'estatus',
      headerName: 'Estatus',
      flex: 0.7,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
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
          isBlocked={params.row.isBlocked_project}
          status={params.row.estatus}
          onEdit={() => router.push(`/editar-proyecto/${params.row.project_id}`)}
        />
      ),
    },
  ], [router]);

  return (
    <ProjectDataGrid
      title="Proyectos Registrados"
      rows={projects}
      columns={columns}
      loading={loading}
      className="table_grid_pro"
    />
  );
};

export default ClientProjects;
