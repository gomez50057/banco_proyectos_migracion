'use client';

import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Button, Tooltip } from '@mui/material';

const statusIconByStatus = {
  Atendido: {
    icon: <CheckCircleIcon color="success" />,
    label: 'Aceptado',
  },
  Registrado: {
    icon: <ErrorOutlineIcon color="warning" />,
    label: 'Pronto estará en Revisión',
  },
  'En Proceso': {
    icon: <RateReviewIcon color="info" />,
    label: 'Revisión',
  },
};

const ProjectRowActions = ({ isBlocked, status, onEdit }) => {
  if (isBlocked) {
    const item = statusIconByStatus[status] || statusIconByStatus.Registrado;
    return (
      <Tooltip title={item.label}>
        <Box component="span" sx={{ alignItems: 'center', display: 'inline-flex' }}>
          {item.icon}
        </Box>
      </Tooltip>
    );
  }

  return (
    <Button className="crud-button" onClick={onEdit} size="small" variant="contained">
      Editar
    </Button>
  );
};

export default ProjectRowActions;
