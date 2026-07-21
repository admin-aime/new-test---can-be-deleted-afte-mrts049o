import { useState, useRef } from 'react';
import { useAdmin } from '../store/AdminContext';
import { Upload, FileText, Check, X, AlertTriangle, Users } from 'lucide-react';
import { ROLES, UserRole, UserStatus } from '../types';

interface PreviewRow {
  name: string;
  email: string;
  role: string;
  accountName: string;
  valid: boolean;
  error?: string;
}

export default function ImportUsers() {
  const { accounts, importUsers } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [fileName, setFileName] = useState('');
  const [imported, setImported] = useState(false);
  const [importCount, setImportCount] = useState(0);

  const parseCSV = (text: string): PreviewRow[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 1) return [];
    const rows: PreviewRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 4) {
        rows.push({ name: cols[0] || '', email: cols[1] || '', role: cols[2] || '', accountName: cols[3] || '', valid: false, error: 'Incomplete row' });
        continue;
      }
      const name = cols[0];
      const email = cols[1];
      const role = cols[2];
      const accountName = cols[3];
      const errors: string[] = [];
      if (!name) errors.push('Name required');
      if (!email || !email.includes('@')) errors.push('Valid email required');
      if (!ROLES.includes(role as UserRole)) errors.push(`Invalid role: must be ${ROLES.join(', ')}`);
      rows.push({
        name, email, role, accountName,
        valid: errors.length === 0,
        error: errors.length > 0 ? errors.join('; ') : undefined,
      });
    }
    return rows;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setPreview(parseCSV(text));
    };
    reader.readAsText(file);
    setImported(false);
  };

  const handleImport = () => {
    const validRows = preview.filter(r => r.valid);
    if (validRows.length === 0) return;
    const newUsers = validRows.map(r => {
      const acct = accounts.find(a => a.name.toLowerCase() === r.accountName.toLowerCase());
      return {
        name: r.name,
        email: r.email,
        role: r.role as UserRole,
        status: 'Active' as UserStatus,
        accountId: acct?.id || '',
        contactId: '',
        mfaEnabled: false,
      };
    });
    importUsers(newUsers);
    setImportCount(newUsers.length);
    setImported(true);
  };

  const validCount = preview.filter(r => r.valid).length;
  const invalidCount = preview.filter(r => !r.valid).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Import Users</h1>
        <p className="text-sm text-gray-500 mt-1">Bulk import users from a CSV file</p>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">1. Upload CSV File</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your CSV file should have columns: <span className="font-medium">Name, Email, Role, Account Name</span>
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700">{fileName ? fileName : 'Click to select a CSV file'}</p>
          <p className="text-xs text-gray-500 mt-1">or drag and drop here</p>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-700 mb-2">Example CSV format:</p>
          <code className="text-xs text-gray-600 block bg-white p-2 rounded border border-gray-200">
            Name,Email,Role,Account Name<br />
            John Smith,john@example.com,Sales Representative,Acme Corp<br />
            Jane Doe,jane@example.com,Sales Manager,TechVentures
          </code>
        </div>
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">2. Preview & Confirm</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-emerald-600 flex items-center gap-1"><Check className="w-4 h-4" /> {validCount} valid</span>
              {invalidCount > 0 && <span className="text-red-500 flex items-center gap-1"><X className="w-4 h-4" /> {invalidCount} invalid</span>}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Account</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {preview.map((r, i) => (
                  <tr key={i} className={r.valid ? '' : 'bg-red-50/30'}>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.role}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.accountName}</td>
                    <td className="px-4 py-3">
                      {r.valid ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-600">{r.error}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {imported && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-sm text-emerald-700">
              <Check className="w-4 h-4" /> Successfully imported {importCount} user{importCount !== 1 ? 's' : ''}!
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleImport}
              disabled={validCount === 0 || imported}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Users className="w-4 h-4" /> Import {validCount} User{validCount !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
