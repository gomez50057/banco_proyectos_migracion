'use client';

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const ProjectCreationModal = ({ isOpen, onRequestClose, projectId }) => {
  const router = useRouter();

  const handleClose = () => {
    onRequestClose();
    router.push('/panel-usuario');
  };

  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={() => {}}
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>La operación fue exitosa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ID del Proyecto: {projectId}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          He finalizado
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectCreationModal;
