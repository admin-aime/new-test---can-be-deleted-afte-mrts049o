import { Shield, Users, FileText, Upload, Key, Activity, ShieldCheck } from 'lucide-react';

export default function ModelOverview() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel — Platform Overview</h1>
        <p className="text-gray-500 mt-2">
          A user management and access control administration panel for the CRM platform.
          Used by IT Administrators to manage who can access the system and what they can do.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-600" /> What It Does</h2>
        <p className="text-sm text-gray-600 mt-2">
          The Admin Panel is the central hub for managing user access to the CRM platform. IT Administrators
          can create and manage user accounts, assign roles and permissions, monitor active sessions, trigger
          password resets, toggle multi-factor authentication, and view a complete audit trail of every access
          change. The panel also supports bulk user import via CSV for large-scale onboarding.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Activity className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">User Dashboard</h3>
              <p className="text-xs text-gray-500 mt-1">At-a-glance metrics: total users, active/inactive/locked counts, active sessions, recent logins, and latest audit activity.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Users className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">User Management</h3>
              <p className="text-xs text-gray-500 mt-1">Full CRUD for user accounts. Search, filter by role and status. Activate, deactivate, or lock accounts with one click.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Role-Based Access</h3>
              <p className="text-xs text-gray-500 mt-1">Three roles: Sales Representative, Sales Manager, IT Administrator. Each role has a defined permission set visible on the Roles page.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Audit Log</h3>
              <p className="text-xs text-gray-500 mt-1">Every user management action is tracked: who did what, to whom, and when. Filterable by action type and searchable.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Upload className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Bulk Import</h3>
              <p className="text-xs text-gray-500 mt-1">Upload a CSV file to create multiple users at once. Preview parsed data and fix validation errors before confirming.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Key className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Security Controls</h3>
              <p className="text-xs text-gray-500 mt-1">Trigger password reset emails, toggle MFA on/off per user, and monitor active sessions from the user detail page.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Use It</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">1. Monitor the dashboard</h3>
            <p className="text-sm text-gray-600 mt-1">The Dashboard gives you an immediate view of your user base — how many are active, inactive, or locked, plus recent login activity and audit events.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">2. Manage users</h3>
            <p className="text-sm text-gray-600 mt-1">Use the Users page to search, filter, and manage all accounts. Click any user to see their full profile, session info, and audit history, then edit, deactivate, reset their password, or toggle MFA from the detail page.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">3. Assign roles</h3>
            <p className="text-sm text-gray-600 mt-1">When creating or editing a user, pick their role. The Roles page shows exactly what permissions each role includes so you always know what access you are granting.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">4. Track everything</h3>
            <p className="text-sm text-gray-600 mt-1">The Audit Log records every change — user creation, edits, role changes, deactivations, password resets, and MFA toggles. Use filters to find specific actions or search by name.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">5. Import in bulk</h3>
            <p className="text-sm text-gray-600 mt-1">For large teams, prepare a CSV with Name, Email, Role, and Account Name columns. Upload it on the Import page, review the preview for any invalid rows, and confirm to create all valid users at once.</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">User Roles</h2>
        <div className="space-y-2">
          {[
            { role: 'Sales Representative', desc: 'Frontline seller — manages personal deals, accounts, and contacts. Cannot access admin features.' },
            { role: 'Sales Manager', desc: 'Team lead — views all pipeline data, exports reports, and monitors team performance.' },
            { role: 'IT Administrator', desc: 'System admin — full user management, role assignment, security settings, and audit oversight.' },
          ].map(s => (
            <div key={s.role} className="flex items-start gap-3 p-2 rounded-lg">
              <span className="text-sm font-medium text-gray-900 w-44 flex-shrink-0">{s.role}</span>
              <span className="text-sm text-gray-600">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
