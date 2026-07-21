import { Account, Contact, Opportunity, Activity } from '../types';

export const seedAccounts: Account[] = [
  { id: 'acc-1', name: 'Acme Corporation', industry: 'Manufacturing', website: 'www.acmecorp.com', phone: '(555) 123-4567', address: '100 Industrial Blvd, Chicago, IL 60601', createdAt: '2025-01-15' },
  { id: 'acc-2', name: 'TechVentures Inc', industry: 'Technology', website: 'www.techventures.io', phone: '(555) 234-5678', address: '200 Innovation Dr, San Francisco, CA 94105', createdAt: '2025-02-20' },
  { id: 'acc-3', name: 'Global Health Partners', industry: 'Healthcare', website: 'www.ghpartners.com', phone: '(555) 345-6789', address: '300 Wellness Way, Boston, MA 02110', createdAt: '2025-03-10' },
  { id: 'acc-4', name: 'First National Financial', industry: 'Finance', website: 'www.fnf.com', phone: '(555) 456-7890', address: '400 Capital Square, New York, NY 10005', createdAt: '2025-03-22' },
];

export const seedContacts: Contact[] = [
  { id: 'con-1', name: 'Sarah Johnson', email: 'sarah@acmecorp.com', phone: '(555) 111-2233', jobTitle: 'VP of Operations', accountId: 'acc-1', createdAt: '2025-01-20' },
  { id: 'con-2', name: 'Mark Wilson', email: 'mark@acmecorp.com', phone: '(555) 111-3344', jobTitle: 'Procurement Manager', accountId: 'acc-1', createdAt: '2025-01-25' },
  { id: 'con-3', name: 'Lisa Chen', email: 'lisa@techventures.io', phone: '(555) 222-4455', jobTitle: 'CTO', accountId: 'acc-2', createdAt: '2025-02-22' },
  { id: 'con-4', name: 'David Park', email: 'david@techventures.io', phone: '(555) 222-5566', jobTitle: 'Head of Engineering', accountId: 'acc-2', createdAt: '2025-02-28' },
  { id: 'con-5', name: 'Dr. Emily Ross', email: 'emily@ghpartners.com', phone: '(555) 333-6677', jobTitle: 'Chief Medical Officer', accountId: 'acc-3', createdAt: '2025-03-12' },
  { id: 'con-6', name: 'James Brown', email: 'james@ghpartners.com', phone: '(555) 333-7788', jobTitle: 'IT Director', accountId: 'acc-3', createdAt: '2025-03-15' },
  { id: 'con-7', name: 'Robert Kim', email: 'robert@fnf.com', phone: '(555) 444-8899', jobTitle: 'CFO', accountId: 'acc-4', createdAt: '2025-03-25' },
  { id: 'con-8', name: 'Angela Martinez', email: 'angela@fnf.com', phone: '(555) 444-9900', jobTitle: 'VP of Risk Management', accountId: 'acc-4', createdAt: '2025-03-28' },
];

export const seedOpportunities: Opportunity[] = [
  { id: 'opp-1', name: 'Enterprise ERP Implementation', value: 250000, stage: 'Negotiation', probability: 70, accountId: 'acc-1', contactId: 'con-1', expectedCloseDate: '2025-06-30', createdAt: '2025-02-01' },
  { id: 'opp-2', name: 'Supply Chain Optimization', value: 180000, stage: 'Proposal', probability: 50, accountId: 'acc-1', contactId: 'con-2', expectedCloseDate: '2025-07-15', createdAt: '2025-03-01' },
  { id: 'opp-3', name: 'Cloud Migration Services', value: 420000, stage: 'Qualified', probability: 30, accountId: 'acc-2', contactId: 'con-3', expectedCloseDate: '2025-08-01', createdAt: '2025-03-15' },
  { id: 'opp-4', name: 'DevOps Platform License', value: 95000, stage: 'Closed Won', probability: 100, accountId: 'acc-2', contactId: 'con-4', expectedCloseDate: '2025-04-15', createdAt: '2025-01-10' },
  { id: 'opp-5', name: 'Healthcare Analytics Suite', value: 320000, stage: 'Proposal', probability: 50, accountId: 'acc-3', contactId: 'con-5', expectedCloseDate: '2025-07-30', createdAt: '2025-04-01' },
  { id: 'opp-6', name: 'Patient Portal Redesign', value: 145000, stage: 'Lead', probability: 10, accountId: 'acc-3', contactId: 'con-6', expectedCloseDate: '2025-09-01', createdAt: '2025-04-10' },
  { id: 'opp-7', name: 'Compliance Monitoring Tool', value: 110000, stage: 'Closed Won', probability: 100, accountId: 'acc-3', contactId: 'con-6', expectedCloseDate: '2025-03-20', createdAt: '2024-12-01' },
  { id: 'opp-8', name: 'Financial Risk Platform', value: 550000, stage: 'Negotiation', probability: 70, accountId: 'acc-4', contactId: 'con-7', expectedCloseDate: '2025-06-15', createdAt: '2025-02-15' },
  { id: 'opp-9', name: 'Automated Reporting System', value: 200000, stage: 'Qualified', probability: 30, accountId: 'acc-4', contactId: 'con-8', expectedCloseDate: '2025-08-15', createdAt: '2025-03-20' },
  { id: 'opp-10', name: 'Trading Desk Upgrade', value: 380000, stage: 'Lead', probability: 10, accountId: 'acc-4', contactId: 'con-7', expectedCloseDate: '2025-10-01', createdAt: '2025-04-15' },
  { id: 'opp-11', name: 'Manufacturing IoT Platform', value: 175000, stage: 'Closed Lost', probability: 0, accountId: 'acc-1', contactId: 'con-1', expectedCloseDate: '2025-03-01', createdAt: '2024-11-01' },
  { id: 'opp-12', name: 'AI Chatbot Integration', value: 85000, stage: 'Closed Won', probability: 100, accountId: 'acc-2', contactId: 'con-3', expectedCloseDate: '2025-02-28', createdAt: '2024-10-15' },
];

export const seedActivities: Activity[] = [
  { id: 'act-1', type: 'Call', date: '2025-04-10', notes: 'Discussed ERP requirements with Sarah. She is very interested in the finance module but needs board approval.', opportunityId: 'opp-1', createdAt: '2025-04-10' },
  { id: 'act-2', type: 'Meeting', date: '2025-04-08', notes: 'On-site demo of supply chain module. Mark was impressed with the real-time inventory tracking.', opportunityId: 'opp-2', createdAt: '2025-04-08' },
  { id: 'act-3', type: 'Email', date: '2025-04-07', notes: 'Sent cloud migration proposal and pricing breakdown to Lisa. She will review with the engineering team.', opportunityId: 'opp-3', createdAt: '2025-04-07' },
  { id: 'act-4', type: 'Call', date: '2025-04-05', notes: 'Follow-up call with David about DevOps platform renewal. Contract signed!', opportunityId: 'opp-4', createdAt: '2025-04-05' },
  { id: 'act-5', type: 'Meeting', date: '2025-04-03', notes: 'Presented healthcare analytics demo to Dr. Ross. She requested a custom module for patient outcome tracking.', opportunityId: 'opp-5', createdAt: '2025-04-03' },
  { id: 'act-6', type: 'Call', date: '2025-04-02', notes: 'Initial outreach to James about the patient portal. He will connect us with the UX team.', opportunityId: 'opp-6', createdAt: '2025-04-02' },
  { id: 'act-7', type: 'Email', date: '2025-04-01', notes: 'Sent risk platform proposal to Robert. He wants to discuss pricing structure next week.', opportunityId: 'opp-8', createdAt: '2025-04-01' },
  { id: 'act-8', type: 'Meeting', date: '2025-03-28', notes: 'Quarterly business review with Angela. Discussed the reporting system requirements and timeline.', opportunityId: 'opp-9', createdAt: '2025-03-28' },
  { id: 'act-9', type: 'Call', date: '2025-03-25', notes: 'Cold call to Robert about trading desk modernization. He showed strong interest in the real-time analytics.', opportunityId: 'opp-10', createdAt: '2025-03-25' },
  { id: 'act-10', type: 'Email', date: '2025-03-20', notes: 'Sent final contract for compliance monitoring tool. James confirmed receipt.', opportunityId: 'opp-7', createdAt: '2025-03-20' },
];
