import { useCrm } from '../store/CrmContext';
import { STAGES, STAGE_DOT } from '../types';
import { DollarSign, Target, TrendingUp, CheckCircle, Phone, Mail, Calendar, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { opportunities, activities, accounts } = useCrm();

  const openDeals = opportunities.filter(o => o.stage !== 'Closed Won' && o.stage !== 'Closed Lost');
  const totalPipeline = openDeals.reduce((sum, o) => sum + o.value, 0);
  const activeDeals = openDeals.length;
  const wonDeals = opportunities.filter(o => o.stage === 'Closed Won');
  const lostDeals = opportunities.filter(o => o.stage === 'Closed Lost');
  const closedTotal = wonDeals.length + lostDeals.length;
  const winRate = closedTotal > 0 ? Math.round((wonDeals.length / closedTotal) * 100) : 0;
  const wonValue = wonDeals.reduce((sum, o) => sum + o.value, 0);

  const stageData = STAGES.map(stage => {
    const deals = opportunities.filter(o => o.stage === stage);
    return { stage, count: deals.length, value: deals.reduce((s, o) => s + o.value, 0) };
  });
  const maxValue = Math.max(...stageData.map(s => s.value), 1);

  const recentActivities = [...activities].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const activityIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone className="w-4 h-4" />;
      case 'Email': return <Mail className="w-4 h-4" />;
      case 'Meeting': return <Calendar className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Pipeline overview and key metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><DollarSign className="w-5 h-5 text-blue-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Pipeline Value</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalPipeline.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{activeDeals} active deal{activeDeals !== 1 ? 's' : ''}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Target className="w-5 h-5 text-indigo-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{winRate}%</p>
          <p className="text-xs text-gray-500 mt-1">{wonDeals.length} won / {closedTotal} closed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Revenue Won</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${wonValue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">from {wonDeals.length} closed deals</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-amber-600" /></div>
            <span className="text-xs font-medium text-gray-500 uppercase">Accounts</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{accounts.length}</p>
          <p className="text-xs text-gray-500 mt-1">active in pipeline</p>
        </div>
      </div>

      {/* Pipeline Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Deals by Stage</h2>
          <div className="space-y-3">
            {stageData.map(s => (
              <div key={s.stage} className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600 flex-shrink-0">{s.stage}</div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${s.stage === 'Closed Won' ? 'bg-emerald-400' : s.stage === 'Closed Lost' ? 'bg-red-400' : 'bg-blue-500'}`}
                      style={{ width: maxValue > 0 ? `${(s.value / maxValue) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">${s.value.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 w-6 text-right">{s.count}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
            {stageData.map(s => (
              <Link key={s.stage} to={`/pipeline`} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                <span className={`w-2 h-2 rounded-full ${STAGE_DOT[s.stage]}`} />{s.stage}: ${s.value.toLocaleString()}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
            <Link to="/activities" className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {recentActivities.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {recentActivities.map(act => {
                const opp = opportunities.find(o => o.id === act.opportunityId);
                return (
                  <div key={act.id} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      act.type === 'Call' ? 'bg-blue-100 text-blue-600' : act.type === 'Email' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {activityIcon(act.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-900 truncate">{act.notes}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{act.type} · {act.date}{opp ? ` · ${opp.name}` : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
