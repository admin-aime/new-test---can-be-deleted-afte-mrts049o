import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCrm } from '../store/CrmContext';
import { ArrowLeft, Building2, Globe, Phone, MapPin, Users, Target, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { STAGE_COLORS } from '../types';
import { useState } from 'react';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Account } from '../types';

export default function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts, contacts, opportunities, updateAccount, deleteAccount } = useCrm();
  const account = accounts.find(a => a.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);
  const [form, setForm] = useState({ name: '', industry: '', website: '', phone: '', address: '' });

  if (!account) {
    return (
      <div className="text-center py-16">
        <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">Account not found</h2>
        <Link to="/accounts" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">Back to Accounts</Link>
      </div>
    );
  }

  const accountContacts = contacts.filter(c => c.accountId === account.id);
  const accountOpps = opportunities.filter(o => o.accountId === account.id);

  const openEdit = () => {
    setForm({ name: account.name, industry: account.industry, website: account.website, phone: account.phone, address: account.address });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    updateAccount({ ...account, name: form.name, industry: form.industry, website: form.website, phone: form.phone, address: form.address });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteAccount(account.id);
    navigate('/accounts');
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/accounts')} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to Accounts
      </button>

      {/* Account Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{account.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{account.industry}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                {account.website && <span className="inline-flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-gray-400" /> {account.website}</span>}
                {account.phone && <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gray-400" /> {account.phone}</span>}
                {account.address && <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {account.address}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openEdit} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"><Pencil className="w-4 h-4" /> Edit</button>
            <button onClick={() => setDeleteTarget(account)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /> Delete</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Users className="w-4 h-4" /> Contacts ({accountContacts.length})</h2>
            <Link to="/contacts" className="text-xs text-blue-600 hover:text-blue-800">View all</Link>
          </div>
          {accountContacts.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">No contacts linked to this account.</p>
          ) : (
            <div className="space-y-2">
              {accountContacts.map(c => (
                <Link key={c.id} to={`/contacts/${c.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.jobTitle}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Opportunities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Target className="w-4 h-4" /> Opportunities ({accountOpps.length})</h2>
            <Link to="/opportunities" className="text-xs text-blue-600 hover:text-blue-800">View all</Link>
          </div>
          {accountOpps.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">No opportunities linked to this account.</p>
          ) : (
            <div className="space-y-2">
              {accountOpps.map(o => (
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
      </div>

      <FormModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Account">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select...</option>
              <option>Technology</option><option>Healthcare</option><option>Finance</option><option>Manufacturing</option><option>Retail</option><option>Education</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input type="text" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Account"
        message={`Are you sure you want to delete ${account.name}? This will also remove all linked contacts and opportunities.`}
      />
    </div>
  );
}
