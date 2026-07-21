import { User, AuditEntry, Account, Contact } from '../types';

export const seedAccounts: Account[] = [
  { id: 'acc-1', name: 'Acme Corporation' },
  { id: 'acc-2', name: 'TechVentures Inc' },
  { id: 'acc-3', name: 'Global Health Partners' },
  { id: 'acc-4', name: 'First National Financial' },
];

export const seedContacts: Contact[] = [
  { id: 'con-1', name: 'Sarah Johnson' },
  { id: 'con-2', name: 'Mark Wilson' },
  { id: 'con-3', name: 'Lisa Chen' },
  { id: 'con-4', name: 'David Park' },
  { id: 'con-5', name: 'Dr. Emily Ross' },
  { id: 'con-6', name: 'James Brown' },
  { id: 'con-7', name: 'Robert Kim' },
  { id: 'con-8', name: 'Angela Martinez' },
];

export const seedUsers: User[] = [
  { id: 'usr-1', name: 'Alice Morgan', email: 'alice.morgan@company.com', role: 'IT Administrator', status: 'Active', accountId: '', contactId: '', lastLogin: '2025-04-12T09:23:00', mfaEnabled: true, sessions: 1, createdAt: '2025-01-05' },
  { id: 'usr-2', name: 'Bob Chen', email: 'bob.chen@company.com', role: 'Sales Manager', status: 'Active', accountId: 'acc-1', contactId: '', lastLogin: '2025-04-11T16:45:00', mfaEnabled: true, sessions: 2, createdAt: '2025-01-10' },
  { id: 'usr-3', name: 'Carol Davis', email: 'carol.davis@company.com', role: 'Sales Representative', status: 'Active', accountId: 'acc-2', contactId: 'con-3', lastLogin: '2025-04-12T08:15:00', mfaEnabled: false, sessions: 1, createdAt: '2025-02-01' },
  { id: 'usr-4', name: 'Dan Evans', email: 'dan.evans@company.com', role: 'Sales Representative', status: 'Active', accountId: 'acc-3', contactId: 'con-5', lastLogin: '2025-04-10T14:30:00', mfaEnabled: false, sessions: 1, createdAt: '2025-02-15' },
  { id: 'usr-5', name: 'Eve Foster', email: 'eve.foster@company.com', role: 'Sales Representative', status: 'Inactive', accountId: 'acc-4', contactId: 'con-7', lastLogin: '2025-03-20T11:00:00', mfaEnabled: false, sessions: 0, createdAt: '2025-03-01' },
  { id: 'usr-6', name: 'Frank Garcia', email: 'frank.garcia@company.com', role: 'Sales Manager', status: 'Active', accountId: 'acc-1', contactId: '', lastLogin: '2025-04-12T07:50:00', mfaEnabled: true, sessions: 1, createdAt: '2025-03-10' },
  { id: 'usr-7', name: 'Grace Hill', email: 'grace.hill@company.com', role: 'Sales Representative', status: 'Locked', accountId: 'acc-2', contactId: 'con-4', lastLogin: '2025-04-08T09:00:00', mfaEnabled: true, sessions: 0, createdAt: '2025-03-15' },
  { id: 'usr-8', name: 'Henry Ingram', email: 'henry.ingram@company.com', role: 'IT Administrator', status: 'Active', accountId: '', contactId: '', lastLogin: '2025-04-12T06:30:00', mfaEnabled: true, sessions: 2, createdAt: '2025-01-02' },
];

export const seedAuditLog: AuditEntry[] = [
  { id: 'aud-1', actor: 'Henry Ingram', action: 'Created', target: 'Alice Morgan', timestamp: '2025-01-05T10:00:00', details: 'Created new IT Administrator account' },
  { id: 'aud-2', actor: 'Alice Morgan', action: 'Created', target: 'Bob Chen', timestamp: '2025-01-10T14:30:00', details: 'Created Sales Manager account for Acme Corp' },
  { id: 'aud-3', actor: 'Alice Morgan', action: 'Created', target: 'Carol Davis', timestamp: '2025-02-01T09:15:00', details: 'Created Sales Rep account for TechVentures' },
  { id: 'aud-4', actor: 'Alice Morgan', action: 'Created', target: 'Dan Evans', timestamp: '2025-02-15T11:00:00', details: 'Created Sales Rep account for Global Health' },
  { id: 'aud-5', actor: 'Alice Morgan', action: 'Created', target: 'Eve Foster', timestamp: '2025-03-01T08:45:00', details: 'Created Sales Rep account for First National Financial' },
  { id: 'aud-6', actor: 'Alice Morgan', action: 'Deactivated', target: 'Eve Foster', timestamp: '2025-03-22T16:00:00', details: 'User on extended leave — account deactivated' },
  { id: 'aud-7', actor: 'Henry Ingram', action: 'Created', target: 'Frank Garcia', timestamp: '2025-03-10T13:00:00', details: 'Created Sales Manager account for Acme Corp' },
  { id: 'aud-8', actor: 'Henry Ingram', action: 'Created', target: 'Grace Hill', timestamp: '2025-03-15T10:30:00', details: 'Created Sales Rep account for TechVentures' },
  { id: 'aud-9', actor: 'Alice Morgan', action: 'Role Changed', target: 'Frank Garcia', timestamp: '2025-03-28T09:00:00', details: 'Changed role from Sales Representative to Sales Manager' },
  { id: 'aud-10', actor: 'Henry Ingram', action: 'Password Reset', target: 'Grace Hill', timestamp: '2025-04-08T09:00:00', details: 'Password reset triggered after multiple failed MFA attempts. Account locked.' },
  { id: 'aud-11', actor: 'Alice Morgan', action: 'MFA Toggled', target: 'Bob Chen', timestamp: '2025-04-01T12:00:00', details: 'Enabled MFA for Bob Chen' },
  { id: 'aud-12', actor: 'Alice Morgan', action: 'Reactivated', target: 'Grace Hill', timestamp: '2025-04-10T08:00:00', details: 'Account unlocked after security review' },
];

export const rolePermissions = [
  {
    role: 'Sales Representative' as const,
    permissions: ['View own deals', 'Create/edit own deals', 'View assigned accounts', 'View assigned contacts', 'Log activities', 'View dashboard'],
  },
  {
    role: 'Sales Manager' as const,
    permissions: ['View all deals', 'Create/edit all deals', 'View all accounts', 'View all contacts', 'Log activities', 'View dashboard', 'View team pipeline', 'Export reports'],
  },
  {
    role: 'IT Administrator' as const,
    permissions: ['Manage users', 'Assign roles', 'Reset passwords', 'Toggle MFA', 'View audit log', 'Import users', 'View all data', 'System configuration'],
  },
];
