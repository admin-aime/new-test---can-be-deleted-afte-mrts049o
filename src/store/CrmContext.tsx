import React, { createContext, useContext, useState, useCallback } from 'react';
import { Account, Contact, Opportunity, Activity, DealStage, STAGE_PROBABILITY } from '../types';
import { seedAccounts, seedContacts, seedOpportunities, seedActivities } from '../data/seed';

interface CrmState {
  accounts: Account[];
  contacts: Contact[];
  opportunities: Opportunity[];
  activities: Activity[];
}

interface CrmActions {
  addAccount: (a: Omit<Account, 'id' | 'createdAt'>) => void;
  updateAccount: (a: Account) => void;
  deleteAccount: (id: string) => void;
  addContact: (c: Omit<Contact, 'id' | 'createdAt'>) => void;
  updateContact: (c: Contact) => void;
  deleteContact: (id: string) => void;
  addOpportunity: (o: Omit<Opportunity, 'id' | 'createdAt'>) => void;
  updateOpportunity: (o: Opportunity) => void;
  deleteOpportunity: (id: string) => void;
  moveOpportunity: (id: string, stage: DealStage) => void;
  addActivity: (a: Omit<Activity, 'id' | 'createdAt'>) => void;
  deleteActivity: (id: string) => void;
}

type CrmContextType = CrmState & CrmActions;

const CrmContext = createContext<CrmContextType | null>(null);

export function CrmProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(seedAccounts);
  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(seedOpportunities);
  const [activities, setActivities] = useState<Activity[]>(seedActivities);

  const addAccount = useCallback((a: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = { ...a, id: 'acc-' + crypto.randomUUID().slice(0, 6), createdAt: new Date().toISOString().split('T')[0] };
    setAccounts(prev => [...prev, newAccount]);
  }, []);

  const updateAccount = useCallback((a: Account) => {
    setAccounts(prev => prev.map(ac => ac.id === a.id ? a : ac));
  }, []);

  const deleteAccount = useCallback((id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
    setContacts(prev => prev.filter(c => c.accountId !== id));
    setOpportunities(prev => prev.filter(o => o.accountId !== id));
    setActivities(prev => prev.filter(act => {
      const opp = seedOpportunities.find(o => o.id === act.opportunityId);
      return opp ? opp.accountId !== id : true;
    }));
  }, []);

  const addContact = useCallback((c: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = { ...c, id: 'con-' + crypto.randomUUID().slice(0, 6), createdAt: new Date().toISOString().split('T')[0] };
    setContacts(prev => [...prev, newContact]);
  }, []);

  const updateContact = useCallback((c: Contact) => {
    setContacts(prev => prev.map(ct => ct.id === c.id ? c : ct));
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    setOpportunities(prev => prev.map(o => o.contactId === id ? { ...o, contactId: '' } : o));
  }, []);

  const addOpportunity = useCallback((o: Omit<Opportunity, 'id' | 'createdAt'>) => {
    const newOpp: Opportunity = { ...o, id: 'opp-' + crypto.randomUUID().slice(0, 6), createdAt: new Date().toISOString().split('T')[0] };
    setOpportunities(prev => [...prev, newOpp]);
  }, []);

  const updateOpportunity = useCallback((o: Opportunity) => {
    setOpportunities(prev => prev.map(op => op.id === o.id ? o : op));
  }, []);

  const deleteOpportunity = useCallback((id: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
    setActivities(prev => prev.filter(a => a.opportunityId !== id));
  }, []);

  const moveOpportunity = useCallback((id: string, stage: DealStage) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, stage, probability: STAGE_PROBABILITY[stage] } : o));
  }, []);

  const addActivity = useCallback((a: Omit<Activity, 'id' | 'createdAt'>) => {
    const newAct: Activity = { ...a, id: 'act-' + crypto.randomUUID().slice(0, 6), createdAt: new Date().toISOString().split('T')[0] };
    setActivities(prev => [...prev, newAct]);
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  }, []);

  return (
    <CrmContext.Provider value={{
      accounts, contacts, opportunities, activities,
      addAccount, updateAccount, deleteAccount,
      addContact, updateContact, deleteContact,
      addOpportunity, updateOpportunity, deleteOpportunity, moveOpportunity,
      addActivity, deleteActivity,
    }}>
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  const ctx = useContext(CrmContext);
  if (!ctx) throw new Error('useCrm must be inside CrmProvider');
  return ctx;
}
