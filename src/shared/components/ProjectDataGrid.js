'use client';

import React, { useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';

export const dataGridLocaleText = {
  noRowsLabel: 'No se encontraron registros',
  noResultsOverlayLabel: 'No se encontraron resultados',
  toolbarColumns: 'Columnas',
  toolbarFilters: 'Filtros',
  toolbarDensity: 'Densidad',
  toolbarExport: 'Exportar',
  columnMenuLabel: 'Menú',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuManageColumns: 'Administrar columnas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar columna',
  columnMenuUnsort: 'Quitar orden',
  columnMenuSortAsc: 'Ordenar ascendente',
  columnMenuSortDesc: 'Ordenar descendente',
  footerRowSelected: (count) => `${count.toLocaleString()} fila(s) seleccionada(s)`,
  MuiTablePagination: {
    labelRowsPerPage: 'Filas por página:',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
  },
};

export const formatGridValue = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'N/A';
  }

  return value === null || value === undefined || value === '' ? 'N/A' : value;
};

export const renderTextCell = (params) => (
  <Box
    title={String(formatGridValue(params.value))}
    sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
    }}
  >
    {formatGridValue(params.value)}
  </Box>
);

const ProjectDataGrid = ({
  title,
  rows,
  columns,
  loading = false,
  className,
  actions,
  getRowId,
  height = '70vh',
  pageSize = 10,
  noRowsLabel = 'No se encontraron registros',
}) => {
  const apiRef = useGridApiRef();
  const preparedColumns = useMemo(() => columns.map((column) => {
    if (column.field !== 'acciones') {
      return column;
    }

    return {
      ...column,
      cellClassName: [column.cellClassName, 'project-data-grid-actionsColumn'].filter(Boolean).join(' '),
      disableColumnMenu: true,
      headerClassName: [column.headerClassName, 'project-data-grid-actionsColumn'].filter(Boolean).join(' '),
      resizable: false,
      width: column.width || 160,
    };
  }), [columns]);
  const hasActionsColumn = preparedColumns.some((column) => column.field === 'acciones');

  useEffect(() => {
    if (!hasActionsColumn || !apiRef.current?.setState) {
      return;
    }

    apiRef.current.setState((state) => ({
      ...state,
      pinnedColumns: {
        left: state.pinnedColumns?.left || [],
        right: [
          ...(state.pinnedColumns?.right || []).filter((field) => field !== 'acciones'),
          'acciones',
        ],
      },
    }));
    apiRef.current.updateRenderContext?.();
    apiRef.current.forceUpdateRenderContext?.();
  }, [apiRef, hasActionsColumn]);

  return (
    <Box className={className} sx={{ width: '100%' }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-between',
          margin: '20px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#DEC9A3',
            fontFamily: 'Montserrat',
            fontSize: { xs: '1.9rem', md: '2.75rem' },
            fontWeight: 600,
            lineHeight: 1.15,
            padding: '10px 0',
          }}
        >
          {title}
        </Typography>
        {actions}
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          height,
          margin: '20px',
          minHeight: 420,
        }}
      >
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={preparedColumns}
          loading={loading}
          getRowId={getRowId}
          disableRowSelectionOnClick
          columnBufferPx={100000}
          pinnedColumnsSectionSeparator="border-and-shadow"
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize },
            },
          }}
          localeText={{ ...dataGridLocaleText, noRowsLabel }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 700,
            },
            '& .MuiDataGrid-cell': {
              alignItems: 'center',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: 'rgba(240, 240, 240, 0.8)',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(230, 230, 230) !important',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
            },
            '& .project-data-grid-actionsColumn': {
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              borderLeft: '1px solid rgba(105, 27, 50, 0.22)',
              boxShadow: '-10px 0 14px rgba(0, 0, 0, 0.10)',
            },
            '& .MuiDataGrid-columnHeader.project-data-grid-actionsColumn': {
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
            },
            '& .MuiDataGrid-row:hover .project-data-grid-actionsColumn': {
              backgroundColor: 'rgba(230, 230, 230, 0.98)',
            },
            '& .MuiDataGrid-cell--pinnedRight, & .MuiDataGrid-columnHeader--pinnedRight': {
              backgroundClip: 'padding-box',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ProjectDataGrid;
