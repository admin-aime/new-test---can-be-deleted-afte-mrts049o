import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCrm } from '../store/CrmContext';
import { ActivityType, ACTIVITY_TYPES } from '../types';
import { Plus, Trash2, Phone, Mail, Calendar, Target, Filter } from 'lucide-react';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import { Activity } from '../types';

export default function Activities() {
  const { activities, opportunities, addActivity, deleteActivity } = useCrm();
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Activity | null>(null);
  const [form, setForm] = useState({ type: 'Call' as ActivityType, date: new Date().toISOString().split('T')[0], notes: '', opportunityId: '' });

  const filtered = [...activities]
    .filter(a => !typeFilter || a.type === typeFilter)
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.notes.trim()) return;
    addActivity({ type: form.type, date: form.date, notes: form.notes, opportunityId: form.opportunityId });
    setForm({ type: 'Call', date: new Date().toISOString().split('T')[0], notes: '', opportunityId: '' });
    setShowForm(false);
  };

  const getOpportunityName = (id: string) => opportunities.find(o => o.id === id)?.name || 'Unknown Deal';

  const iconMap = { Call: <Phone className="w-4 h-4" />, Email: <Mail className="w-4 h-4" />, Meeting: <Calendar className="w-4 h-4" /> };
  const colorMap = { Call: 'bg-blue-100 text-blue-600', Email: 'bg-purple-100 text-purple-600', Meeting: 'bg-amber-100 text-amber-600' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-sm text-gray-500 mt-1">{activities.length} logged activit{activities.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Log Activity
        </button>
      </div>

      <div className="relative inline-block">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
          <option value="">All Types</option>
          {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No activities logged" description={typeFilter ? 'Try a different filter.' : 'Log your first call, email, or meeting.'} action={!typeFilter ? { label: 'Log Activity', onClick: () => setShowForm(true) } : undefined} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {filtered.map(act => (
            <div key={act.id} className="flex items-start gap-4 p-4 hover:bg-gray-50/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[act.type]}`}>{iconMap[act.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{act.type}</span>
                  <span className="text-xs text-gray-400">{act.date}</span>
                </div>
                <p className="text-sm text-gray-600">{act.notes}</p>
                <Link to={`/opportunities/${act.opportunityId}`} className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 hover:text-blue-800">
                  <Target className="w-3 h-3" /> {getOpportunityName(act.opportunityId)}
                </Link>
              </div>
              <button onClick={() => setDeleteTarget(act)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      <FormModal isOpen={showForm} onClose={() => setShowForm(false)} title="Log Activity">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as ActivityType })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity</label>
            <select value={form.opportunityId} onChange={e => setForm({ ...form, opportunityId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select deal...</option>
              {opportunities.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes *</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Log Activity</button>
          </div>
        </form>
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => deleteTarget && deleteActivity(deleteTarget.id)} title="Delete Activity" message="Are you sure you want to delete this activity?" />
    </div>
  );
}
