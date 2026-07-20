export interface Account {
  id: string;
  name: string;
  industry: string;
  website: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  accountId: string;
  createdAt: string;
}

export type DealStage = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export const STAGES: DealStage[] = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export const STAGE_PROBABILITY: Record<DealStage, number> = {
  'Lead': 10,
  'Qualified': 30,
  'Proposal': 50,
  'Negotiation': 70,
  'Closed Won': 100,
  'Closed Lost': 0,
};

export const STAGE_COLORS: Record<DealStage, string> = {
  'Lead': 'bg-slate-100 text-slate-700 border-slate-300',
  'Qualified': 'bg-blue-50 text-blue-700 border-blue-300',
  'Proposal': 'bg-indigo-50 text-indigo-700 border-indigo-300',
  'Negotiation': 'bg-amber-50 text-amber-700 border-amber-300',
  'Closed Won': 'bg-emerald-50 text-emerald-700 border-emerald-300',
  'Closed Lost': 'bg-red-50 text-red-700 border-red-300',
};

export const STAGE_DOT: Record<DealStage, string> = {
  'Lead': 'bg-slate-400',
  'Qualified': 'bg-blue-400',
  'Proposal': 'bg-indigo-400',
  'Negotiation': 'bg-amber-400',
  'Closed Won': 'bg-emerald-400',
  'Closed Lost': 'bg-red-400',
};

export interface Opportunity {
  id: string;
  name: string;
  value: number;
  stage: DealStage;
  probability: number;
  accountId: string;
  contactId: string;
  expectedCloseDate: string;
  createdAt: string;
}

export type ActivityType = 'Call' | 'Email' | 'Meeting';

export const ACTIVITY_TYPES: ActivityType[] = ['Call', 'Email', 'Meeting'];

export interface Activity {
  id: string;
  type: ActivityType;
  date: string;
  notes: string;
  opportunityId: string;
  createdAt: string;
}
