'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import ProjectDataGrid, { formatGridValue, renderTextCell } from '@/shared/components/ProjectDataGrid';
import ProjectDialog from './ProjectDialog';
import { getAdminProjectsTable } from '@/shared/api/projectsApi';
import { normalizeArrayResponse, sortByNewest } from '@/shared/utils/normalizeApiResponse';

const exportProjectRows = (projects) => {
  const ws = XLSX.utils.json_to_sheet(projects.map((project) => ({
    Usuario: project.user || 'N/A',
    'ID del Proyecto': project.project_id || 'N/A',
    'Área de Adscripción': project.area_adscripcion || 'N/A',
    'Nombre del Registrante': project.nombre_registrante || 'N/A',
    'Apellido Paterno': project.apellido_paterno || 'N/A',
    'Apellido Materno': project.apellido_materno || 'N/A',
    'Correo Electrónico': project.correo || 'N/A',
    Teléfono: project.telefono || 'N/A',
    'Extensión Telefónica': project.telefono_ext || 'N/A',
    'Fecha de Registro': project.fecha_registro || 'N/A',
    'Nombre del Proyecto': project.nombre_proyecto || 'N/A',
    Sector: project.sector || 'N/A',
    'Tipo de Proyecto': project.tipo_proyecto || 'N/A',
    'Tipo de Entidad': project.tipo_entidad || 'N/A',
    Dependencia: project.dependencia || 'N/A',
    Organismo: project.organismo || 'N/A',
    'Municipio o Ayuntamiento': project.municipio_ayuntamiento || 'N/A',
    'Unidad Responsable': project.unidad_responsable || 'N/A',
    'Unidad Presupuestal': project.unidad_presupuestal || 'N/A',
    'Inversión Federal': project.inversion_federal || 'N/A',
    'Inversión Estatal': project.inversion_estatal || 'N/A',
    'Inversión Municipal': project.inversion_municipal || 'N/A',
    'Inversión de Otros': project.inversion_otros || 'N/A',
    'Inversión Total': project.inversion_total || 'N/A',
    'Ramo Presupuestal': project.ramo_presupuestal || 'N/A',
    Descripción: project.descripcion || 'N/A',
    'Situación Sin Proyecto': project.situacion_sin_proyecto || 'N/A',
    Objetivos: project.objetivos || 'N/A',
    Metas: project.metas || 'N/A',
    'Gasto Programable': project.gasto_programable || 'N/A',
    'Tiempo de Ejecución (meses)': project.tiempo_ejecucion || 'N/A',
    'Modalidad de Ejecución': project.modalidad_ejecucion || 'N/A',
    'Programa Presupuestario': project.programa_presupuestario || 'N/A',
    Beneficiarios: project.beneficiarios || 'N/A',
    'Normativa Aplicable': project.normativa_aplicable || 'N/A',
    Región: Array.isArray(project.region) ? project.region.join(', ') : project.region || 'N/A',
    Municipio: Array.isArray(project.municipio) ? project.municipio.join(', ') : project.municipio || 'N/A',
    Localidad: project.localidad || 'N/A',
    'Barrio o Colonia': project.barrio_colonia || 'N/A',
    Latitud: project.latitud || 'N/A',
    Longitud: project.longitud || 'N/A',
    'Plan Nacional': project.plan_nacional || 'N/A',
    'Plan Estatal': project.plan_estatal || 'N/A',
    'Plan Municipal': project.plan_municipal || 'N/A',
    'Acuerdos Transversales': project.acuerdos_transversales || 'N/A',
    'Objetivos de Desarrollo Sostenible (ODS)': project.ods || 'N/A',
    'Programas SIE': project.programas_SIE || 'N/A',
    'Indicadores Estratégicos': project.indicadores_estrategicos || 'N/A',
    Observaciones: project.observaciones || 'N/A',
    'Porcentaje de Avance': project.porcentaje_avance || 'N/A',
    Estatus: project.estatus || 'N/A',
    Situación: project.situacion || 'N/A',
    Retroalimentación: project.retroalimentacion || 'N/A',
  })));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Proyectos');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'proyectos.xlsx');
};

const fetchAdminProjectRows = async () => {
  const response = await getAdminProjectsTable();
  return sortByNewest(normalizeArrayResponse(response.data));
};

const adminProjectColumns = [
  { field: 'user', headerName: 'Usuario', minWidth: 160, flex: 0.8 },
  { field: 'project_id', headerName: 'ID del Proyecto', minWidth: 170, flex: 0.8 },
  { field: 'area_adscripcion', headerName: 'Área de Adscripción', minWidth: 220, flex: 1 },
  { field: 'nombre_registrante', headerName: 'Nombre del Registrante', minWidth: 230, flex: 1 },
  { field: 'apellido_paterno', headerName: 'Apellido Paterno', minWidth: 190, flex: 0.9 },
  { field: 'apellido_materno', headerName: 'Apellido Materno', minWidth: 190, flex: 0.9 },
  { field: 'correo', headerName: 'Correo Electrónico', minWidth: 240, flex: 1 },
  { field: 'telefono', headerName: 'Teléfono', minWidth: 150, flex: 0.7 },
  { field: 'telefono_ext', headerName: 'Extensión Telefónica', minWidth: 210, flex: 0.9 },
  { field: 'fecha_registro', headerName: 'Fecha del Registro', minWidth: 180, flex: 0.8 },
  { field: 'nombre_proyecto', headerName: 'Nombre del Proyecto', minWidth: 280, flex: 1.3 },
  { field: 'sector', headerName: 'Sector', minWidth: 170, flex: 0.8 },
  { field: 'tipo_proyecto', headerName: 'Tipo de Proyecto', minWidth: 180, flex: 0.9 },
  { field: 'tipo_entidad', headerName: 'Tipo de Entidad', minWidth: 180, flex: 0.9 },
  { field: 'dependencia', headerName: 'Dependencia', minWidth: 220, flex: 1 },
  { field: 'organismo', headerName: 'Organismo', minWidth: 220, flex: 1 },
  { field: 'municipio_ayuntamiento', headerName: 'Municipio o Ayuntamiento', minWidth: 230, flex: 1 },
  { field: 'unidad_responsable', headerName: 'Unidad Responsable', minWidth: 220, flex: 1 },
  { field: 'unidad_presupuestal', headerName: 'Unidad Presupuestal', minWidth: 220, flex: 1 },
  { field: 'inversion_federal', headerName: 'Inversión Federal', minWidth: 180, flex: 0.8 },
  { field: 'inversion_estatal', headerName: 'Inversión Estatal', minWidth: 180, flex: 0.8 },
  { field: 'inversion_municipal', headerName: 'Inversión Municipal', minWidth: 190, flex: 0.9 },
  { field: 'inversion_otros', headerName: 'Inversión de Otros', minWidth: 190, flex: 0.9 },
  { field: 'inversion_total', headerName: 'Inversión Total', minWidth: 170, flex: 0.8 },
  { field: 'ramo_presupuestal', headerName: 'Ramo Presupuestal', minWidth: 210, flex: 0.9 },
  { field: 'descripcion', headerName: 'Descripción', minWidth: 280, flex: 1.2 },
  { field: 'situacion_sin_proyecto', headerName: 'Situación Sin Proyecto', minWidth: 250, flex: 1 },
  { field: 'objetivos', headerName: 'Objetivos', minWidth: 240, flex: 1 },
  { field: 'metas', headerName: 'Metas', minWidth: 220, flex: 1 },
  { field: 'gasto_programable', headerName: 'Gasto Programable', minWidth: 200, flex: 0.9 },
  { field: 'tiempo_ejecucion', headerName: 'Tiempo de Ejecución', minWidth: 210, flex: 0.9 },
  { field: 'modalidad_ejecucion', headerName: 'Modalidad de Ejecución', minWidth: 240, flex: 1 },
  { field: 'programa_presupuestario', headerName: 'Programa Presupuestario', minWidth: 240, flex: 1 },
  { field: 'beneficiarios', headerName: 'Beneficiarios', minWidth: 170, flex: 0.8 },
  { field: 'normativa_aplicable', headerName: 'Normativa Aplicable', minWidth: 220, flex: 1 },
  { field: 'region', headerName: 'Región', minWidth: 170, flex: 0.8 },
  { field: 'municipio', headerName: 'Municipio', minWidth: 170, flex: 0.8 },
  { field: 'localidad', headerName: 'Localidad', minWidth: 170, flex: 0.8 },
  { field: 'barrio_colonia', headerName: 'Barrio o Colonia', minWidth: 220, flex: 1 },
  { field: 'tipo_localidad', headerName: 'Tipo Localidad', minWidth: 180, flex: 0.9 },
  { field: 'latitud', headerName: 'Latitud', minWidth: 140, flex: 0.7 },
  { field: 'longitud', headerName: 'Longitud', minWidth: 140, flex: 0.7 },
  { field: 'plan_nacional', headerName: 'Plan Nacional', minWidth: 220, flex: 1 },
  { field: 'plan_estatal', headerName: 'Plan Estatal', minWidth: 220, flex: 1 },
  { field: 'plan_municipal', headerName: 'Plan Municipal', minWidth: 220, flex: 1 },
  { field: 'acuerdos_transversales', headerName: 'Acuerdos Transversales', minWidth: 240, flex: 1 },
  { field: 'ods', headerName: 'Objetivos de Desarrollo Sostenible (ODS)', minWidth: 300, flex: 1.2 },
  { field: 'programas_SIE', headerName: 'Programas SIE', minWidth: 190, flex: 0.9 },
  { field: 'indicadores_estrategicos', headerName: 'Indicadores Estratégicos', minWidth: 240, flex: 1 },
  { field: 'observaciones', headerName: 'Observaciones', minWidth: 240, flex: 1 },
  { field: 'porcentaje_avance', headerName: 'Porcentaje de Avance', minWidth: 210, flex: 0.9 },
  { field: 'estatus', headerName: 'Estatus', minWidth: 150, flex: 0.7 },
  { field: 'situacion', headerName: 'Situación', minWidth: 150, flex: 0.7 },
  { field: 'retroalimentacion', headerName: 'Retroalimentación', minWidth: 240, flex: 1 },
];

const CRUDTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const nextProjects = await fetchAdminProjectRows();
      setProjects(nextProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('No se pudieron cargar los proyectos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    fetchAdminProjectRows()
      .then((nextProjects) => {
        if (isActive) {
          setProjects(nextProjects);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        if (isActive) {
          alert('No se pudieron cargar los proyectos. Intenta nuevamente.');
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleOpen = useCallback((project = {}) => {
    setCurrentProject(project);
    setIsEditMode(Boolean(project.project_id));
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentProject({});
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentProject((prevProject) => ({ ...prevProject, [name]: value }));
  }, []);

  const handleDialogSaved = useCallback(async () => {
    await fetchProjects();
    handleClose();
  }, [fetchProjects, handleClose]);

  const exportToXLSX = () => {
    if (projects.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    exportProjectRows(projects);
  };

  const rows = useMemo(() => projects.map((project) => {
    const formattedFields = adminProjectColumns.reduce((accumulator, column) => ({
      ...accumulator,
      [column.field]: formatGridValue(project[column.field]),
    }), {});

    return {
      ...project,
      ...formattedFields,
      id: project.id || project.project_id,
    };
  }), [projects]);

  const columns = useMemo(() => [
    ...adminProjectColumns.map((column) => ({
      ...column,
      renderCell: renderTextCell,
    })),
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box className="Acciones-con">
          <Button
            className="crud-button"
            onClick={() => handleOpen(projects.find((project) => project.project_id === params.row.project_id))}
            size="small"
            variant="contained"
          >
            Editar
          </Button>
        </Box>
      ),
    },
  ], [handleOpen, projects]);

  return (
    <div className="table_grid">
      {loading || projects.length > 0 ? (
        <ProjectDataGrid
          title="Proyectos Registrados"
          rows={rows}
          columns={columns}
          loading={loading}
          className="table_grid"
          height="74vh"
          actions={(
            <Tooltip title="Descargar XLSX" arrow>
              <IconButton onClick={exportToXLSX}>
                <DownloadIcon sx={{ color: '#dec9a3' }} />
              </IconButton>
            </Tooltip>
          )}
        />
      ) : (
        <Typography variant="h6" align="center">Cargando proyectos...</Typography>
      )}
      <ProjectDialog
        open={open}
        onClose={handleClose}
        project={currentProject}
        onChange={handleChange}
        onSubmit={handleDialogSaved}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default CRUDTable;
