export type UserRole = 'Sales Representative' | 'Sales Manager' | 'IT Administrator';
export type UserStatus = 'Active' | 'Inactive' | 'Locked';

export const ROLES: UserRole[] = ['Sales Representative', 'Sales Manager', 'IT Administrator'];
export const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Locked'];

export const ROLE_COLORS: Record<UserRole, string> = {
  'Sales Representative': 'bg-blue-100 text-blue-700',
  'Sales Manager': 'bg-purple-100 text-purple-700',
  'IT Administrator': 'bg-amber-100 text-amber-700',
};

export const STATUS_COLORS: Record<UserStatus, string> = {
  'Active': 'bg-emerald-100 text-emerald-700',
  'Inactive': 'bg-gray-100 text-gray-600',
  'Locked': 'bg-red-100 text-red-700',
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  accountId: string;
  contactId: string;
  lastLogin: string;
  mfaEnabled: boolean;
  sessions: number;
  createdAt: string;
}

export type AuditAction = 'Created' | 'Updated' | 'Deactivated' | 'Reactivated' | 'Role Changed' | 'Password Reset' | 'MFA Toggled';

export const AUDIT_ACTIONS: AuditAction[] = ['Created', 'Updated', 'Deactivated', 'Reactivated', 'Role Changed', 'Password Reset', 'MFA Toggled'];

export const AUDIT_ACTION_COLORS: Record<AuditAction, string> = {
  'Created': 'bg-emerald-100 text-emerald-700',
  'Updated': 'bg-blue-100 text-blue-700',
  'Deactivated': 'bg-red-100 text-red-700',
  'Reactivated': 'bg-emerald-100 text-emerald-700',
  'Role Changed': 'bg-purple-100 text-purple-700',
  'Password Reset': 'bg-amber-100 text-amber-700',
  'MFA Toggled': 'bg-indigo-100 text-indigo-700',
};

export interface AuditEntry {
  id: string;
  actor: string;
  action: AuditAction;
  target: string;
  timestamp: string;
  details: string;
}

export interface RolePermissions {
  role: UserRole;
  permissions: string[];
}

export interface Account {
  id: string;
  name: string;
}

export interface Contact {
  id: string;
  name: string;
}

export interface ParsedCsvRow {
  name: string;
  email: string;
  role: string;
  accountName: string;
  valid: boolean;
  error?: string;
}
