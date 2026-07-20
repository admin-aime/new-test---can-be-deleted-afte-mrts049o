import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCrm } from '../store/CrmContext';
import { Opportunity, STAGES, STAGE_COLORS, STAGE_PROBABILITY, DealStage } from '../types';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';

export default function Opportunities() {
  const { opportunities, accounts, contacts, addOpportunity, updateOpportunity, deleteOpportunity } = useCrm();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Opportunity | null>(null);
  const [form, setForm] = useState({ name: '', value: '', stage: 'Lead' as DealStage, probability: '', accountId: '', contactId: '', expectedCloseDate: '' });

  const filtered = opportunities.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) ||
      (accounts.find(a => a.id === o.accountId)?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchStage = !stageFilter || o.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', value: '', stage: 'Lead', probability: '10', accountId: '', contactId: '', expectedCloseDate: '' });
    setIsFormOpen(true);
  };

  const openEdit = (o: Opportunity) => {
    setEditing(o);
    setForm({ name: o.name, value: String(o.value), stage: o.stage, probability: String(o.probability), accountId: o.accountId, contactId: o.contactId, expectedCloseDate: o.expectedCloseDate });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.value) return;
    const data = {
      name: form.name,
      value: Number(form.value),
      stage: form.stage,
      probability: Number(form.probability),
      accountId: form.accountId,
      contactId: form.contactId,
      expectedCloseDate: form.expectedCloseDate,
    };
    if (editing) {
      updateOpportunity({ ...editing, ...data });
    } else {
      addOpportunity(data);
    }
    setIsFormOpen(false);
  };

  const getAccountName = (id: string) => accounts.find(a => a.id === id)?.name || '—';
  const getContactName = (id: string) => contacts.find(c => c.id === id)?.name || '—';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
          <p className="text-sm text-gray-500 mt-1">{opportunities.length} deal{opportunities.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Opportunity
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search deals..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option value="">All Stages</option>
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No opportunities found" description={search || stageFilter ? 'Try adjusting your filters.' : 'Create your first sales opportunity.'} action={!search && !stageFilter ? { label: 'Add Opportunity', onClick: openCreate } : undefined} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Deal</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Account</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Close Date</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <Link to={`/opportunities/${o.id}`} className="font-medium text-gray-900 hover:text-blue-600">{o.name}</Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{getAccountName(o.accountId)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">${o.value.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${STAGE_COLORS[o.stage]}`}>{o.stage}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">{o.expectedCloseDate}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(o)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteTarget(o)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editing ? 'Edit Opportunity' : 'New Opportunity'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deal Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value ($) *</label>
              <input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
              <input type="number" value={form.probability} onChange={e => setForm({ ...form, probability: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select value={form.stage} onChange={e => { const s = e.target.value as DealStage; setForm({ ...form, stage: s, probability: String(STAGE_PROBABILITY[s]) }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
              <select value={form.accountId} onChange={e => setForm({ ...form, accountId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select account...</option>
                {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <select value={form.contactId} onChange={e => setForm({ ...form, contactId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select contact...</option>
                {contacts.filter(c => !form.accountId || c.accountId === form.accountId).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
            <input type="date" value={form.expectedCloseDate} onChange={e => setForm({ ...form, expectedCloseDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">{editing ? 'Save Changes' : 'Create Opportunity'}</button>
          </div>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteOpportunity(deleteTarget.id)}
        title="Delete Opportunity"
        message={`Are you sure you want to delete ${deleteTarget?.name}?`}
      />
    </div>
  );
}
