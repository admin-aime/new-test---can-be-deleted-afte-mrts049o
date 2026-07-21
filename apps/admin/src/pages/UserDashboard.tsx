import { useAdmin } from '../store/AdminContext';
import { Users, UserCheck, UserX, ShieldAlert, Clock, Monitor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STATUS_COLORS } from '../types';

export default function UserDashboard() {
  const { users, auditLog } = useAdmin();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const lockedUsers = users.filter(u => u.status === 'Locked').length;
  const mfaEnabled = users.filter(u => u.mfaEnabled).length;
  const activeSessions = users.reduce((sum, u) => sum + u.sessions, 0);

  const recentLogins = [...users]
    .filter(u => u.lastLogin)
    .sort((a, b) => b.lastLogin.localeCompare(a.lastLogin))
    .slice(0, 5);

  const recentAudit = auditLog.slice(0, 5);

  const roleBreakdown = [
    { role: 'IT Administrator', count: users.filter(u => u.role === 'IT Administrator').length },
    { role: 'Sales Manager', count: users.filter(u => u.role === 'Sales Manager').length },
    { role: 'Sales Representative', count: users.filter(u => u.role === 'Sales Representative').length },
  ];

  const formatTime = (iso: string) => {
    if (!iso) return 'Never';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">User management overview and metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Users className="w-5 h-5 text-indigo-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Total Users</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
          <p className="text-xs text-gray-500 mt-1">{mfaEnabled} with MFA enabled</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><UserCheck className="w-5 h-5 text-emerald-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Active</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
          <p className="text-xs text-gray-500 mt-1">{activeSessions} active sessions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><UserX className="w-5 h-5 text-gray-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Inactive</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{inactiveUsers}</p>
          <p className="text-xs text-gray-500 mt-1">accounts deactivated</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><ShieldAlert className="w-5 h-5 text-red-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Locked</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{lockedUsers}</p>
          <p className="text-xs text-gray-500 mt-1">security locked</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Users by Role</h2>
          <div className="space-y-3">
            {roleBreakdown.map(r => (
              <div key={r.role} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{r.role}</span>
                <span className="text-sm font-medium text-gray-900">{r.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Logins */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Clock className="w-4 h-4" /> Recent Logins</h2>
          </div>
          {recentLogins.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">No recent logins</p>
          ) : (
            <div className="space-y-3">
              {recentLogins.map(u => (
                <div key={u.id} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 truncate">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Monitor className="w-3 h-3" /> {u.sessions}
                    </div>
                    <p className="text-xs text-gray-400">{formatTime(u.lastLogin)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Audit */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Audit Activity</h2>
            <Link to="/audit-log" className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {recentAudit.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">No audit entries</p>
          ) : (
            <div className="space-y-3">
              {recentAudit.map(a => (
                <div key={a.id} className="text-sm">
                  <p className="text-gray-900 truncate"><span className="font-medium">{a.actor}</span> {a.action.toLowerCase()} {a.target}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatTime(a.timestamp)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
