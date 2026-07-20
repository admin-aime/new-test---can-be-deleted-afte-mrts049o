import { useState, useCallback } from 'react';

interface CrudState<T> {
  items: T[];
  editingItem: T | null;
  isFormOpen: boolean;
  deleteTarget: T | null;
  openCreate: () => void;
  openEdit: (item: T) => void;
  openDelete: (item: T) => void;
  closeForm: () => void;
  closeDelete: () => void;
}

export function useCrudState<T extends { id: string }>(): CrudState<T> {
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  const openCreate = useCallback(() => { setEditingItem(null); setIsFormOpen(true); }, []);
  const openEdit = useCallback((item: T) => { setEditingItem(item); setIsFormOpen(true); }, []);
  const openDelete = useCallback((item: T) => { setDeleteTarget(item); }, []);
  const closeForm = useCallback(() => { setIsFormOpen(false); setEditingItem(null); }, []);
  const closeDelete = useCallback(() => { setDeleteTarget(null); }, []);

  return { items: [] as T[], editingItem, isFormOpen, deleteTarget, openCreate, openEdit, openDelete, closeForm, closeDelete };
}
