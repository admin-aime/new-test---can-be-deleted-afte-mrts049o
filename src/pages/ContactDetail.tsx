import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCrm } from '../store/CrmContext';
import { ArrowLeft, User, Mail, Phone, Briefcase, Building2, Target, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { STAGE_COLORS } from '../types';
import { useState } from 'react';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Contact } from '../types';

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, accounts, opportunities, updateContact, deleteContact } = useCrm();
  const contact = contacts.find(c => c.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', jobTitle: '', accountId: '' });

  if (!contact) {
    return (
      <div className="text-center py-16">
        <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">Contact not found</h2>
        <Link to="/contacts" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">Back to Contacts</Link>
      </div>
    );
  }

  const account = accounts.find(a => a.id === contact.accountId);
  const contactOpps = opportunities.filter(o => o.contactId === contact.id);

  const openEdit = () => {
    setForm({ name: contact.name, email: contact.email, phone: contact.phone, jobTitle: contact.jobTitle, accountId: contact.accountId });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    updateContact({ ...contact, name: form.name, email: form.email, phone: form.phone, jobTitle: form.jobTitle, accountId: form.accountId });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteContact(contact.id);
    navigate('/contacts');
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/contacts')} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to Contacts
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{contact.name}</h1>
              <p className="text-sm text-gray-500">{contact.jobTitle}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gray-400" /> {contact.email}</span>
                {contact.phone && <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gray-400" /> {contact.phone}</span>}
                {account && (
                  <Link to={`/accounts/${account.id}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                    <Building2 className="w-3.5 h-3.5" /> {account.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openEdit} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"><Pencil className="w-4 h-4" /> Edit</button>
            <button onClick={() => setDeleteTarget(contact)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /> Delete</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Target className="w-4 h-4" /> Opportunities ({contactOpps.length})</h2>
          <Link to="/opportunities" className="text-xs text-blue-600 hover:text-blue-800">View all</Link>
        </div>
        {contactOpps.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No opportunities linked to this contact.</p>
        ) : (
          <div className="space-y-2">
            {contactOpps.map(o => (
              <Link key={o.id} to={`/opportunities/${o.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{o.name}</p>
                  <p className="text-xs text-gray-500">${o.value.toLocaleString()} · Closes {o.expectedCloseDate}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STAGE_COLORS[o.stage]}`}>{o.stage}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <FormModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Contact">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label><input type="text" value={form.jobTitle} onChange={e => setForm({ ...form, jobTitle: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Account</label><select value={form.accountId} onChange={e => setForm({ ...form, accountId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select account...</option>{accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Changes</button></div>
        </form>
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Contact" message={`Are you sure you want to delete ${contact.name}?`} />
    </div>
  );
}
