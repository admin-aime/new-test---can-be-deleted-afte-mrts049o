import { Target, Building2, Users, Columns, Activity, BarChart3, Phone, Mail, Calendar } from 'lucide-react';

export default function ModelOverview() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">SalesCRM — Platform Overview</h1>
        <p className="text-gray-500 mt-2">
          A lightweight CRM built for account-based businesses to manage their sales pipeline from lead to close.
          Track companies, contacts, deals, and every interaction along the way.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Target className="w-5 h-5 text-blue-600" /> What It Does</h2>
        <p className="text-sm text-gray-600 mt-2">
          SalesCRM helps sales teams organize their workflow in one place. You can manage company accounts, track
          individual contacts at those companies, and monitor every sales opportunity as it moves through your
          pipeline. A visual kanban board lets you drag deals between stages, and an activity log records every
          call, email, and meeting for full context on each deal.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Dashboard</h3>
              <p className="text-xs text-gray-500 mt-1">See your total pipeline value, win rate, revenue won, and deal distribution across stages at a glance. Recent activity shows the latest interactions.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Accounts</h3>
              <p className="text-xs text-gray-500 mt-1">Store company profiles with industry, website, phone, and address. Each account links to its contacts and active deals.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Contacts</h3>
              <p className="text-xs text-gray-500 mt-1">Track the people you work with — name, email, phone, job title, and which company they belong to.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Opportunities</h3>
              <p className="text-xs text-gray-500 mt-1">Manage deals with value, probability, stage, linked account/contact, and expected close date. Filter by stage to focus on what matters.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Columns className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Pipeline View</h3>
              <p className="text-xs text-gray-500 mt-1">A kanban board with one column per stage — drag and drop deals to move them through Lead, Qualified, Proposal, Negotiation, and closed stages.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 rounded-lg border border-gray-100">
            <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Activity Log</h3>
              <p className="text-xs text-gray-500 mt-1">Log calls, emails, and meetings with dates and notes. Every activity links back to its deal for full context.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Use It</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">1. Set up your accounts and contacts</h3>
            <p className="text-sm text-gray-600 mt-1">Start on the Accounts page. Add the companies you sell to — name, industry, and contact details. Then add the people you work with at each company on the Contacts page, linking each person to their account.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">2. Create opportunities</h3>
            <p className="text-sm text-gray-600 mt-1">On the Opportunities page, add each deal you are working on. Give it a name, value, pick the account and contact, set the current stage, and add an expected close date.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">3. Manage your pipeline</h3>
            <p className="text-sm text-gray-600 mt-1">Open the Pipeline view to see all your deals arranged as cards across stage columns. As deals progress, drag them to the next column — the probability updates automatically.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">4. Log your activity</h3>
            <p className="text-sm text-gray-600 mt-1">Every time you call, email, or meet about a deal, log it on the Activities page or from the deal's detail page. This builds a complete history so you never lose context.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">5. Monitor the dashboard</h3>
            <p className="text-sm text-gray-600 mt-1">The Dashboard gives you the big picture — total pipeline value, win rate, revenue you have already won, and a breakdown of deals by stage. Use it to spot bottlenecks and forecast revenue.</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Pipeline Stages</h2>
        <div className="space-y-2">
          {[
            { stage: 'Lead', desc: 'New opportunity, initial outreach needed. Default probability: 10%.' },
            { stage: 'Qualified', desc: 'Contact has shown interest and fits the profile. Default probability: 30%.' },
            { stage: 'Proposal', desc: 'A formal proposal or quote has been sent. Default probability: 50%.' },
            { stage: 'Negotiation', desc: 'Terms are being discussed. Default probability: 70%.' },
            { stage: 'Closed Won', desc: 'Deal has been won. Probability: 100%.' },
            { stage: 'Closed Lost', desc: 'Deal was lost. Probability: 0%.' },
          ].map(s => (
            <div key={s.stage} className="flex items-start gap-3 p-2 rounded-lg">
              <span className="text-sm font-medium text-gray-900 w-28 flex-shrink-0">{s.stage}</span>
              <span className="text-sm text-gray-600">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
