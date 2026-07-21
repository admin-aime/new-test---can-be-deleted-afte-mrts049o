import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, AuditEntry, AuditAction, UserRole, UserStatus, Account, Contact } from '../types';
import { seedUsers, seedAuditLog, seedAccounts, seedContacts } from '../data/seed';

interface AdminState {
  users: User[];
  auditLog: AuditEntry[];
  accounts: Account[];
  contacts: Contact[];
}

interface AdminActions {
  addUser: (u: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'sessions'>) => void;
  updateUser: (u: User) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  resetPassword: (id: string) => void;
  toggleMfa: (id: string) => void;
  addAuditEntry: (actor: string, action: AuditAction, target: string, details: string) => void;
  importUsers: (users: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'sessions'>[]) => void;
}

type AdminContextType = AdminState & AdminActions;
const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(seedAuditLog);
  const [accounts] = useState<Account[]>(seedAccounts);
  const [contacts] = useState<Contact[]>(seedContacts);

  const addAuditEntry = useCallback((actor: string, action: AuditAction, target: string, details: string) => {
    const entry: AuditEntry = {
      id: 'aud-' + crypto.randomUUID().slice(0, 6),
      actor, action, target,
      timestamp: new Date().toISOString(),
      details,
    };
    setAuditLog(prev => [entry, ...prev]);
  }, []);

  const addUser = useCallback((u: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'sessions'>) => {
    const newUser: User = {
      ...u,
      id: 'usr-' + crypto.randomUUID().slice(0, 6),
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '',
      sessions: 0,
    };
    setUsers(prev => [...prev, newUser]);
    addAuditEntry('You', 'Created', newUser.name, `Created ${u.role} account for ${u.email}`);
  }, [addAuditEntry]);

  const updateUser = useCallback((u: User) => {
    setUsers(prev => {
      const old = prev.find(x => x.id === u.id);
      if (old && old.role !== u.role) {
        addAuditEntry('You', 'Role Changed', u.name, `Changed role from ${old.role} to ${u.role}`);
      }
      return prev.map(x => x.id === u.id ? u : x);
    });
  }, [addAuditEntry]);

  const deleteUser = useCallback((id: string) => {
    const user = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    if (user) addAuditEntry('You', 'Updated', user.name, `Deleted user account for ${user.email}`);
  }, [users, addAuditEntry]);

  const toggleUserStatus = useCallback((id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const newStatus: UserStatus = u.status === 'Active' ? 'Inactive' : 'Active';
      const action: AuditAction = newStatus === 'Active' ? 'Reactivated' : 'Deactivated';
      addAuditEntry('You', action, u.name, `Account ${newStatus.toLowerCase()}`);
      return { ...u, status: newStatus, sessions: newStatus === 'Inactive' ? 0 : u.sessions };
    }));
  }, [addAuditEntry]);

  const resetPassword = useCallback((id: string) => {
    const user = users.find(u => u.id === id);
    if (user) addAuditEntry('You', 'Password Reset', user.name, 'Password reset email sent');
  }, [users, addAuditEntry]);

  const toggleMfa = useCallback((id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      addAuditEntry('You', 'MFA Toggled', u.name, u.mfaEnabled ? 'MFA disabled' : 'MFA enabled');
      return { ...u, mfaEnabled: !u.mfaEnabled };
    }));
  }, [addAuditEntry]);

  const importUsers = useCallback((imported: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'sessions'>[]) => {
    const newUsers = imported.map(u => ({
      ...u,
      id: 'usr-' + crypto.randomUUID().slice(0, 6),
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '',
      sessions: 0,
    }));
    setUsers(prev => [...prev, ...newUsers]);
    addAuditEntry('You', 'Created', 'Bulk Import', `Imported ${imported.length} user(s)`);
  }, [addAuditEntry]);

  return (
    <AdminContext.Provider value={{
      users, auditLog, accounts, contacts,
      addUser, updateUser, deleteUser, toggleUserStatus, resetPassword, toggleMfa, addAuditEntry, importUsers,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be inside AdminProvider');
  return ctx;
}
