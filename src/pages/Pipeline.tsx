import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCrm } from '../store/CrmContext';
import { STAGES, STAGE_COLORS, DealStage } from '../types';
import { DollarSign, Building2, GripVertical, ArrowRight } from 'lucide-react';

export default function Pipeline() {
  const { opportunities, accounts, moveOpportunity } = useCrm();
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const getAccountName = (id: string) => accounts.find(a => a.id === id)?.name || '—';

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStage(stage);
  };

  const handleDragLeave = () => setDragOverStage(null);

  const handleDrop = (e: React.DragEvent, stage: DealStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) moveOpportunity(id, stage);
    setDragOverStage(null);
    setDraggingId(null);
  };

  const handleDragEnd = () => {
    setDragOverStage(null);
    setDraggingId(null);
  };

  const totalPipeline = opportunities
    .filter(o => o.stage !== 'Closed Won' && o.stage !== 'Closed Lost')
    .reduce((sum, o) => sum + o.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
          <p className="text-sm text-gray-500 mt-1">${totalPipeline.toLocaleString()} total pipeline value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STAGES.map(stage => {
          const stageOpps = opportunities.filter(o => o.stage === stage);
          const stageValue = stageOpps.reduce((sum, o) => sum + o.value, 0);
          const isDragOver = dragOverStage === stage;

          return (
            <div key={stage} className="flex flex-col min-h-[300px]">
              <div className={`flex items-center justify-between px-3 py-2 rounded-t-lg border ${STAGE_COLORS[stage]}`}>
                <span className="text-xs font-semibold">{stage}</span>
                <span className="text-xs font-medium">{stageOpps.length} · ${stageValue.toLocaleString()}</span>
              </div>
              <div
                className={`flex-1 bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-2 space-y-2 transition-colors min-h-[200px] ${isDragOver ? 'bg-blue-50 border-blue-300' : ''}`}
                onDragOver={(e) => handleDragOver(e, stage)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage)}
              >
                {stageOpps.length === 0 && (
                  <div className="flex items-center justify-center h-full min-h-[100px]">
                    <p className="text-xs text-gray-400">No deals</p>
                  </div>
                )}
                {stageOpps.map(opp => (
                  <div
                    key={opp.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, opp.id)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white rounded-lg border border-gray-200 p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${draggingId === opp.id ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-3.5 h-3.5 text-gray-300 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <Link to={`/opportunities/${opp.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2">{opp.name}</Link>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Building2 className="w-3 h-3" /> {getAccountName(opp.accountId)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-gray-900">${opp.value.toLocaleString()}</span>
                          <span className="text-xs text-gray-400">{opp.probability}%</span>
                        </div>
                        {opp.expectedCloseDate && (
                          <p className="text-xs text-gray-400 mt-1">Close: {opp.expectedCloseDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
