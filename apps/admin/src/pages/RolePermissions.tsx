import { rolePermissions } from '../data/seed';
import { Shield, ShieldCheck, ShieldAlert, Check } from 'lucide-react';
import { ROLE_COLORS } from '../types';
import { useAdmin } from '../store/AdminContext';

const roleIcons: Record<string, React.ReactNode> = {
  'Sales Representative': <Shield className="w-6 h-6" />,
  'Sales Manager': <ShieldCheck className="w-6 h-6" />,
  'IT Administrator': <ShieldAlert className="w-6 h-6" />,
};

const roleDescriptions: Record<string, string> = {
  'Sales Representative': 'Frontline seller — manages personal deals, accounts, and contacts. Cannot access admin features.',
  'Sales Manager': 'Team lead — views all pipeline data, exports reports, and monitors team performance.',
  'IT Administrator': 'System admin — full user management, role assignment, security settings, and audit oversight.',
};

export default function RolePermissions() {
  const { users } = useAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
        <p className="text-sm text-gray-500 mt-1">Manage access levels across the CRM platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rolePermissions.map(rp => {
          const count = users.filter(u => u.role === rp.role).length;
          return (
            <div key={rp.role} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {roleIcons[rp.role]}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">{rp.role}</h2>
                  <p className="text-xs text-gray-500">{count} user{count !== 1 ? 's' : ''} assigned</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{roleDescriptions[rp.role]}</p>
              <div className="border-t border-gray-100 pt-4 flex-1">
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Permissions</h3>
                <div className="space-y-2">
                  {rp.permissions.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
