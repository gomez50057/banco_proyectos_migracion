'use client';

import React, { useEffect, useState } from 'react';
import ProjectDataGrid, { renderTextCell } from '@/shared/components/ProjectDataGrid';
import { getPublicProjectsTable } from '@/shared/api/projectsApi';
import { normalizeArrayResponse, sortByNewest } from '@/shared/utils/normalizeApiResponse';

const columns = [
  {
    field: 'nombre_proyecto',
    headerName: 'Nombre del Proyecto',
    flex: 1.3,
    minWidth: 240,
    renderCell: renderTextCell,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    flex: 1.8,
    minWidth: 320,
    renderCell: renderTextCell,
  },
  {
    field: 'tipo_proyecto',
    headerName: 'Tipo de Proyecto',
    flex: 1,
    minWidth: 170,
    renderCell: renderTextCell,
  },
  {
    field: 'municipio',
    headerName: 'Municipio',
    flex: 0.9,
    minWidth: 160,
    renderCell: renderTextCell,
  },
  {
    field: 'beneficiarios',
    headerName: 'Beneficiarios',
    flex: 0.8,
    minWidth: 140,
    align: 'center',
    headerAlign: 'center',
    renderCell: renderTextCell,
  },
];

const TableComponent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 10_000);

    const fetchProjects = async () => {
      try {
        const response = await getPublicProjectsTable();
        const projectRows = normalizeArrayResponse(response.data);
        const extraIds = [
          '0191b2025562',
          '0193d2025553',
          '0191b2025547',
          '0191b2025530',
          '0191b2025512',
          '0191b2025499',
          '0191b2025490',
          '0191b2025485',
          '0191b2025478',
          '0191b2025469',
        ];
        const filteredData = sortByNewest(projectRows.filter(({ project_id }) =>
          extraIds.includes(project_id?.toString())
        ));

        setProjects(filteredData.map((project, index) => ({
          id: project.project_id || index,
          fecha_registro: project.fecha_registro || 'N/A',
          nombre_proyecto: project.nombre_proyecto || 'N/A',
          descripcion: project.descripcion || 'N/A',
          tipo_proyecto: project.tipo_proyecto || 'N/A',
          municipio: project.municipio || 'N/A',
          beneficiarios: project.beneficiarios || 'N/A',
        })));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
        clearTimeout(timer);
      }
    };

    fetchProjects();
    return () => clearTimeout(timer);
  }, []);

  const noRowsLabel = loading && !timedOut
    ? 'Buscando registros...'
    : loading && timedOut
      ? 'No se encuentran registros, revisa tu conexión y actualiza la página'
      : 'No se encontraron registros';

  return (
    <ProjectDataGrid
      title="Proyectos Registrados"
      rows={projects}
      columns={columns}
      loading={loading}
      className="table_grid_pro_publica"
      noRowsLabel={noRowsLabel}
      pageSize={10}
    />
  );
};

export default TableComponent;
