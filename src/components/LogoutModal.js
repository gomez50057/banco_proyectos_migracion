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
import { logout } from '@/shared/api/authApi';

const LogoutModal = ({ isOpen, onClose }) => {
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión. Intenta de nuevo.');
    }
  };

  return (
    <Dialog open={Boolean(isOpen)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Estás a punto de cerrar sesión</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas salir?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleLogout} color="primary" variant="contained">
          Sí, Cerrar Sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
