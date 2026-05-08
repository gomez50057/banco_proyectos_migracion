'use client';

import React, { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import ProjectDataGrid, { renderTextCell } from '@/shared/components/ProjectDataGrid';
import { getInvestmentProjects } from '@/shared/api/investmentApi';
import { normalizeArrayResponse, sortByNewest } from '@/shared/utils/normalizeApiResponse';
import { useRouter } from 'next/navigation';
import urlAnexos from '../../../utils/urlAnexos';

const anexosToText = (anexos) => (
  Array.isArray(anexos) && anexos.length > 0
    ? anexos.map((anexo) => `${anexo.tipo_anexo}: https://bibliotecadigitaluplaph.hidalgo.gob.mx${anexo.archivo}`).join('\n')
    : 'No cuenta con anexos'
);

const investmentProjectColumns = [
  { field: 'projInvestment_id', headerName: 'ID del Proyecto', minWidth: 170, flex: 0.8 },
  { field: 'fecha_registro', headerName: 'Fecha de Registro', minWidth: 170, flex: 0.8 },
  { field: 'nombre_proyecto', headerName: 'Nombre del Proyecto', minWidth: 280, flex: 1.4 },
  { field: 'nombre_dependencia', headerName: 'Nombre de la Dependencia', minWidth: 260, flex: 1.2 },
  { field: 'area_adscripcion', headerName: 'Área de Adscripción', minWidth: 220, flex: 1 },
  { field: 'nombre_registrante', headerName: 'Nombre del Registrante', minWidth: 230, flex: 1 },
  { field: 'apellido_paterno', headerName: 'Apellido Paterno', minWidth: 190, flex: 0.9 },
  { field: 'apellido_materno', headerName: 'Apellido Materno', minWidth: 190, flex: 0.9 },
  { field: 'correo', headerName: 'Correo Electrónico', minWidth: 240, flex: 1 },
  { field: 'telefono', headerName: 'Teléfono', minWidth: 150, flex: 0.7 },
  { field: 'extension', headerName: 'Extensión', minWidth: 150, flex: 0.7 },
  { field: 'ejercicio_fiscal', headerName: 'Ejercicio Fiscal', minWidth: 170, flex: 0.8 },
  { field: 'dependencia', headerName: 'Dependencia', minWidth: 220, flex: 1 },
  { field: 'organismo', headerName: 'Organismo', minWidth: 220, flex: 1 },
  { field: 'unidad_responsable', headerName: 'Unidad Responsable', minWidth: 220, flex: 1 },
  { field: 'unidad_presupuestal', headerName: 'Unidad Presupuestal', minWidth: 220, flex: 1 },
  { field: 'descripcion_proyecto', headerName: 'Descripción del Proyecto', minWidth: 280, flex: 1.2 },
  { field: 'situacion_actual', headerName: 'Situación Actual', minWidth: 220, flex: 1 },
  { field: 'tipo_obra', headerName: 'Tipo de Obra', minWidth: 170, flex: 0.8 },
  { field: 'calendario_ejecucion', headerName: 'Calendario de Ejecución (meses)', minWidth: 260, flex: 1.1 },
  { field: 'beneficio_social', headerName: 'Beneficio Social', minWidth: 220, flex: 1 },
  { field: 'beneficio_economico', headerName: 'Beneficio Económico', minWidth: 230, flex: 1 },
  { field: 'numero_beneficiarios', headerName: 'Número de Beneficiarios', minWidth: 230, flex: 1 },
  { field: 'inversion_presupuestada', headerName: 'Inversión Presupuestada', minWidth: 230, flex: 1 },
  { field: 'cobertura', headerName: 'Cobertura', minWidth: 170, flex: 0.8 },
  { field: 'regiones', headerName: 'Regiones', minWidth: 180, flex: 0.8 },
  { field: 'municipios', headerName: 'Municipios', minWidth: 180, flex: 0.8 },
  { field: 'ods', headerName: 'ODS', minWidth: 180, flex: 0.8 },
  { field: 'plan_estatal', headerName: 'Plan Estatal de Desarrollo', minWidth: 250, flex: 1.1 },
  { field: 'objetivo_ped', headerName: 'Objetivo PED', minWidth: 200, flex: 0.9 },
  { field: 'estrategia_ped', headerName: 'Estrategia PED', minWidth: 210, flex: 0.9 },
  { field: 'linea_accion_ped', headerName: 'Línea de Acción PED', minWidth: 230, flex: 1 },
  { field: 'indicador_ped', headerName: 'Indicador PED', minWidth: 210, flex: 0.9 },
  { field: 'programa_sectorial', headerName: 'Programa Sectorial', minWidth: 220, flex: 1 },
  { field: 'objetivo_programa', headerName: 'Objetivo del Programa', minWidth: 230, flex: 1 },
  { field: 'propuesta_campana', headerName: 'Propuesta de Campaña', minWidth: 230, flex: 1 },
  { field: 'cual_propuesta', headerName: '¿Cuál Propuesta?', minWidth: 220, flex: 1 },
  { field: 'prioridad', headerName: 'Prioridad', minWidth: 160, flex: 0.7 },
  { field: 'expediente_tecnico', headerName: '¿Cuenta con expediente técnico validado?', minWidth: 300, flex: 1.2 },
];

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getInvestmentProjects();
        const projectRows = sortByNewest(normalizeArrayResponse(response.data));
        const data = projectRows.map((project) => {
          const anexos = urlAnexos.filter(
            (anexo) => anexo.projInvestment_id === project.projInvestment_id
          );

          return {
            id: project.projInvestment_id,
            projInvestment_id: project.projInvestment_id,
            fecha_registro: project.fecha_registro || 'N/A',
            nombre_proyecto: project.nombre_proyecto || 'N/A',
            anexos: anexos.length > 0 ? anexos : [],
            nombre_dependencia: project.nombre_dependencia || 'N/A',
            area_adscripcion: project.area_adscripcion || 'N/A',
            nombre_registrante: project.nombre_registrante || 'N/A',
            apellido_paterno: project.apellido_paterno || 'N/A',
            apellido_materno: project.apellido_materno || 'N/A',
            correo: project.correo || 'N/A',
            telefono: project.telefono || 'N/A',
            extension: project.extension || 'N/A',
            ejercicio_fiscal: project.ejercicio_fiscal || 'N/A',
            dependencia: project.dependencia || 'N/A',
            organismo: project.organismo || 'N/A',
            unidad_responsable: project.unidad_responsable || 'N/A',
            unidad_presupuestal: project.unidad_presupuestal || 'N/A',
            descripcion_proyecto: project.descripcion_proyecto || 'N/A',
            situacion_actual: project.situacion_actual || 'N/A',
            tipo_obra: project.tipo_obra || 'N/A',
            calendario_ejecucion: project.calendario_ejecucion || 'N/A',
            beneficio_social: project.beneficio_social || 'N/A',
            beneficio_economico: project.beneficio_economico || 'N/A',
            numero_beneficiarios: project.numero_beneficiarios || 'N/A',
            inversion_presupuestada: project.inversion_presupuestada || 'N/A',
            cobertura: project.cobertura || 'N/A',
            regiones: Array.isArray(project.regiones) ? project.regiones.join(', ') : project.regiones || 'N/A',
            municipios: Array.isArray(project.municipios) ? project.municipios.join(', ') : project.municipios || 'N/A',
            ods: project.ods || 'N/A',
            plan_estatal: project.plan_estatal || 'N/A',
            objetivo_ped: project.objetivo_ped || 'N/A',
            estrategia_ped: project.estrategia_ped || 'N/A',
            linea_accion_ped: project.linea_accion_ped || 'N/A',
            indicador_ped: project.indicador_ped || 'N/A',
            programa_sectorial: project.programa_sectorial || 'N/A',
            objetivo_programa: project.objetivo_programa || 'N/A',
            propuesta_campana: project.propuesta_campana || 'N/A',
            cual_propuesta: project.cual_propuesta || 'N/A',
            prioridad: project.prioridad || 'N/A',
            expediente_tecnico: project.expediente_tecnico || 'N/A',
          };
        });

        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(projects.map((project) => ({
      'ID del Proyecto': project.projInvestment_id,
      'Fecha de Registro': project.fecha_registro,
      'Nombre del Proyecto': project.nombre_proyecto,
      'Nombre de la Dependencia': project.nombre_dependencia,
      'Área de Adscripción': project.area_adscripcion,
      'Nombre del Registrante': project.nombre_registrante,
      'Apellido Paterno': project.apellido_paterno,
      'Apellido Materno': project.apellido_materno,
      'Correo Electrónico': project.correo,
      'Teléfono': project.telefono,
      'Extensión': project.extension,
      'Ejercicio Fiscal': project.ejercicio_fiscal,
      'Dependencia': project.dependencia,
      'Organismo': project.organismo,
      'Unidad Responsable': project.unidad_responsable,
      'Unidad Presupuestal': project.unidad_presupuestal,
      'Descripción del Proyecto': project.descripcion_proyecto,
      'Situación Actual': project.situacion_actual,
      'Tipo de Obra': project.tipo_obra,
      'Calendario de Ejecución (meses)': project.calendario_ejecucion,
      'Beneficio Social': project.beneficio_social,
      'Beneficio Económico': project.beneficio_economico,
      'Número de Beneficiarios': project.numero_beneficiarios,
      'Inversión Presupuestada': project.inversion_presupuestada,
      'Cobertura': project.cobertura,
      'Regiones': project.regiones,
      'Municipios': project.municipios,
      'ODS': project.ods,
      'Plan Estatal de Desarrollo': project.plan_estatal,
      'Objetivo PED': project.objetivo_ped,
      'Estrategia PED': project.estrategia_ped,
      'Línea de Acción PED': project.linea_accion_ped,
      'Indicador PED': project.indicador_ped,
      'Programa Sectorial': project.programa_sectorial,
      'Objetivo del Programa': project.objetivo_programa,
      'Propuesta de Campaña': project.propuesta_campana,
      '¿Cuál Propuesta?': project.cual_propuesta,
      'Prioridad': project.prioridad,
      '¿Cuenta con expediente técnico validado?': project.expediente_tecnico,
      Anexos: anexosToText(project.anexos),
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Proyectos de Inversión');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'proyectos_inversion.xlsx');
  };

  const columns = useMemo(() => [
    ...investmentProjectColumns.map((column) => ({
      ...column,
      renderCell: renderTextCell,
    })),
    {
      field: 'anexos',
      headerName: 'Anexos',
      minWidth: 220,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        if (!Array.isArray(params.value) || params.value.length === 0) {
          return 'No cuenta con anexos';
        }

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {params.value.map((anexo, index) => (
              <a
                key={`${anexo.archivo}-${index}`}
                href={`https://bibliotecadigitaluplaph.hidalgo.gob.mx${anexo.archivo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {anexo.tipo_anexo}
              </a>
            ))}
          </Box>
        );
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 170,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box className="Acciones-con">
          <Button
            className="crud-button"
            onClick={() => router.push(`/editar-proyecto-inversion/${params.row.projInvestment_id}`)}
            size="small"
            variant="contained"
          >
            Editar
          </Button>
          <Button
            className="crud-button"
            onClick={() => router.push(`/reporte-inversion/${params.row.projInvestment_id}`)}
            size="small"
            variant="contained"
          >
            Ficha
          </Button>
        </Box>
      ),
    },
  ], [router]);

  return (
    <ProjectDataGrid
      title="Proyectos de Inversión Registrados Admin"
      rows={projects}
      columns={columns}
      loading={loading}
      className="table_grid_pro"
      actions={(
        <Tooltip title="Descargar XLSX" arrow>
          <IconButton onClick={exportToXLSX}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      )}
    />
  );
};

export default ClientProjects;
