import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCrm } from '../store/CrmContext';
import { ArrowLeft, Target, DollarSign, Calendar, Building2, User, Phone, Mail, Activity, Plus, Trash2, Pencil } from 'lucide-react';
import { STAGE_COLORS, STAGES, STAGE_PROBABILITY, ActivityType, ACTIVITY_TYPES, DealStage } from '../types';
import { useState } from 'react';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Opportunity } from '../types';

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { opportunities, accounts, contacts, activities, updateOpportunity, deleteOpportunity, addActivity, deleteActivity } = useCrm();
  const opp = opportunities.find(o => o.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Opportunity | null>(null);
  const [form, setForm] = useState({ name: '', value: '', stage: 'Lead' as DealStage, probability: '', accountId: '', contactId: '', expectedCloseDate: '' });
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityForm, setActivityForm] = useState({ type: 'Call' as ActivityType, date: new Date().toISOString().split('T')[0], notes: '' });

  if (!opp) {
    return (
      <div className="text-center py-16">
        <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">Opportunity not found</h2>
        <Link to="/opportunities" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">Back to Opportunities</Link>
      </div>
    );
  }

  const account = accounts.find(a => a.id === opp.accountId);
  const contact = contacts.find(c => c.id === opp.contactId);
  const oppActivities = activities.filter(a => a.opportunityId === opp.id).sort((a, b) => b.date.localeCompare(a.date));

  const openEdit = () => {
    setForm({ name: opp.name, value: String(opp.value), stage: opp.stage, probability: String(opp.probability), accountId: opp.accountId, contactId: opp.contactId, expectedCloseDate: opp.expectedCloseDate });
    setIsEditing(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    updateOpportunity({ ...opp, name: form.name, value: Number(form.value), stage: form.stage, probability: Number(form.probability), accountId: form.accountId, contactId: form.contactId, expectedCloseDate: form.expectedCloseDate });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteOpportunity(opp.id);
    navigate('/opportunities');
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.notes.trim()) return;
    addActivity({ type: activityForm.type, date: activityForm.date, notes: activityForm.notes, opportunityId: opp.id });
    setActivityForm({ type: 'Call', date: new Date().toISOString().split('T')[0], notes: '' });
    setShowActivityForm(false);
  };

  const activityTypeIcon = (type: string) => {
    switch (type) { case 'Call': return <Phone className="w-4 h-4" />; case 'Email': return <Mail className="w-4 h-4" />; default: return <Calendar className="w-4 h-4" />; }
  };
  const activityTypeColor = (type: string) => {
    switch (type) { case 'Call': return 'bg-blue-100 text-blue-600'; case 'Email': return 'bg-purple-100 text-purple-600'; default: return 'bg-amber-100 text-amber-600'; }
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/opportunities')} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"><ArrowLeft className="w-4 h-4" /> Back to Opportunities</button>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-gray-900">{opp.name}</h1>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${STAGE_COLORS[opp.stage]}`}>{opp.stage}</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1"><DollarSign className="w-4 h-4 text-gray-400" /> <span className="font-semibold text-gray-900">${opp.value.toLocaleString()}</span></span>
              <span className="inline-flex items-center gap-1"><Target className="w-4 h-4 text-gray-400" /> {opp.probability}% probability</span>
              <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4 text-gray-400" /> Close: {opp.expectedCloseDate}</span>
              {account && <Link to={`/accounts/${account.id}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"><Building2 className="w-4 h-4" /> {account.name}</Link>}
              {contact && <Link to={`/contacts/${contact.id}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"><User className="w-4 h-4" /> {contact.name}</Link>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openEdit} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"><Pencil className="w-4 h-4" /> Edit</button>
            <button onClick={() => setDeleteTarget(opp)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /> Delete</button>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Activity className="w-4 h-4" /> Activity Log ({oppActivities.length})</h2>
          <button onClick={() => setShowActivityForm(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"><Plus className="w-4 h-4" /> Log Activity</button>
        </div>
        {oppActivities.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">No activities logged yet for this deal.</p>
        ) : (
          <div className="space-y-0">
            {oppActivities.map(act => (
              <div key={act.id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-b-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activityTypeColor(act.type)}`}>{activityTypeIcon(act.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="text-xs font-medium text-gray-900">{act.type}</span><span className="text-xs text-gray-400">{act.date}</span></div>
                  <p className="text-sm text-gray-600 mt-0.5">{act.notes}</p>
                </div>
                <button onClick={() => deleteActivity(act.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <FormModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Opportunity">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Deal Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Value ($) *</label><input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label><input type="number" value={form.probability} onChange={e => setForm({ ...form, probability: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Stage</label><select value={form.stage} onChange={e => { const s = e.target.value as DealStage; setForm({ ...form, stage: s, probability: String(STAGE_PROBABILITY[s]) }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{STAGES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Account</label><select value={form.accountId} onChange={e => setForm({ ...form, accountId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select...</option>{accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact</label><select value={form.contactId} onChange={e => setForm({ ...form, contactId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select...</option>{contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label><input type="date" value={form.expectedCloseDate} onChange={e => setForm({ ...form, expectedCloseDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Changes</button></div>
        </form>
      </FormModal>

      {/* Activity Form Modal */}
      <FormModal isOpen={showActivityForm} onClose={() => setShowActivityForm(false)} title="Log Activity">
        <form onSubmit={handleAddActivity} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><select value={activityForm.type} onChange={e => setActivityForm({ ...activityForm, type: e.target.value as ActivityType })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={activityForm.date} onChange={e => setActivityForm({ ...activityForm, date: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes *</label><textarea value={activityForm.notes} onChange={e => setActivityForm({ ...activityForm, notes: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setShowActivityForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Log Activity</button></div>
        </form>
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Opportunity" message={`Are you sure you want to delete ${opp.name}?`} />
    </div>
  );
}
