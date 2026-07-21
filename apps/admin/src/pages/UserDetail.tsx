import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../store/AdminContext';
import { ArrowLeft, User, Mail, Shield, Activity, Clock, Monitor, Pencil, Trash2, Key, ShieldCheck, ShieldOff, Power, PowerOff } from 'lucide-react';
import { ROLE_COLORS, STATUS_COLORS, UserRole, UserStatus, ROLES, STATUSES } from '../types';
import { useState } from 'react';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { User as UserType } from '../types';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, accounts, contacts, auditLog, updateUser, deleteUser, toggleUserStatus, resetPassword, toggleMfa } = useAdmin();
  const user = users.find(u => u.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<UserType | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'Sales Representative' as UserRole, status: 'Active' as UserStatus, accountId: '', contactId: '', mfaEnabled: false });

  if (!user) {
    return (
      <div className="text-center py-16">
        <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">User not found</h2>
        <Link to="/users" className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block">Back to Users</Link>
      </div>
    );
  }

  const userAccount = accounts.find(a => a.id === user.accountId);
  const userContact = contacts.find(c => c.id === user.contactId);
  const userAudit = auditLog.filter(a => a.target === user.name || a.actor === user.name).slice(0, 10);

  const openEdit = () => {
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status, accountId: user.accountId, contactId: user.contactId, mfaEnabled: user.mfaEnabled });
    setIsEditing(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    updateUser({ ...user, name: form.name, email: form.email, role: form.role, status: form.status, accountId: form.accountId, contactId: form.contactId, mfaEnabled: form.mfaEnabled });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteUser(user.id);
    navigate('/users');
  };

  const formatTime = (iso: string) => {
    if (!iso) return 'Never';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/users')} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to Users
      </button>

      {/* User Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[user.status]}`}>{user.status}</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gray-400" /> {user.email}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[user.role]}`}><Shield className="w-3 h-3" /> {user.role}</span>
                {userAccount && <span className="text-gray-600">Account: {userAccount.name}</span>}
                {userContact && <span className="text-gray-600">Contact: {userContact.name}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => toggleMfa(user.id)} className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border ${user.mfaEnabled ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
              {user.mfaEnabled ? <ShieldCheck className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
              MFA {user.mfaEnabled ? 'On' : 'Off'}
            </button>
            <button onClick={() => resetPassword(user.id)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100">
              <Key className="w-4 h-4" /> Reset Password
            </button>
            <button onClick={() => toggleUserStatus(user.id)} className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border ${user.status === 'Active' ? 'text-red-600 bg-white border-red-200 hover:bg-red-50' : 'text-emerald-600 bg-white border-emerald-200 hover:bg-emerald-50'}`}>
              {user.status === 'Active' ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
              {user.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={openEdit} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"><Pencil className="w-4 h-4" /> Edit</button>
            <button onClick={() => setDeleteTarget(user)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /> Delete</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Monitor className="w-4 h-4" /> Session & Login Info</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className={`font-medium ${user.status === 'Active' ? 'text-emerald-600' : user.status === 'Locked' ? 'text-red-600' : 'text-gray-500'}`}>{user.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Sessions</span>
              <span className="font-medium">{user.sessions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last Login</span>
              <span className="font-medium">{formatTime(user.lastLogin)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">MFA</span>
              <span className={`font-medium ${user.mfaEnabled ? 'text-emerald-600' : 'text-red-500'}`}>{user.mfaEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Account Created</span>
              <span className="font-medium">{user.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Audit History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Activity className="w-4 h-4" /> Audit History</h2>
          {userAudit.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">No audit history for this user.</p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {userAudit.map(a => (
                <div key={a.id} className="text-sm py-2 border-b border-gray-50 last:border-b-0">
                  <p className="text-gray-900"><span className="font-medium">{a.actor}</span> — {a.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.details}</p>
                  <p className="text-xs text-gray-400">{formatTime(a.timestamp)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <FormModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit User">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Role</label><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as UserRole })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">{ROLES.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as UserStatus })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Account</label><select value={form.accountId} onChange={e => setForm({ ...form, accountId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="">None</option>{accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact</label><select value={form.contactId} onChange={e => setForm({ ...form, contactId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="">None</option>{contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          </div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Save Changes</button></div>
        </form>
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete User" message={`Are you sure you want to delete ${user.name}?`} />
    </div>
  );
}
