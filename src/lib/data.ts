
'use server';

import { adminDb } from './firebase-admin';
import {
  AGENTS as initialAgents,
  INSIGHTS as initialInsights,
  CATEGORIES as initialCategories,
} from './placeholder-data';
import type { Agent, Insight } from './definitions';

// --- Featured Agent ---
const FEATURED_AGENT_DOC_REF = adminDb.collection('app_config').doc('featured_agent');

export async function setFeaturedAgents(agentIds: string[]): Promise<void> {
  await FEATURED_AGENT_DOC_REF.set({ agentIds: agentIds });
}

export async function getFeaturedAgentIds(): Promise<string[]> {
  const docSnap = await FEATURED_AGENT_DOC_REF.get();
  if (docSnap.exists) {
    return docSnap.data()?.agentIds ?? [];
  }
  return [];
}

// --- Agents ---

export async function updateAgent(id: string, agentData: Omit<Agent, 'id'>): Promise<void> {
  const docRef = adminDb.collection('agents').doc(id);
  await docRef.set(agentData);
}

export async function deleteAgent(id: string): Promise<void> {
  const agentDocRef = adminDb.collection('agents').doc(id);
  const featuredDocRef = adminDb.collection('app_config').doc('featured_agent');

  await adminDb.runTransaction(async (transaction) => {
    const featuredSnap = await transaction.get(featuredDocRef);
    if (featuredSnap.exists) {
      const featuredIds = featuredSnap.data()?.agentIds ?? [];
      if (featuredIds.includes(id)) {
        const newFeaturedIds = featuredIds.filter((agentId: string) => agentId !== id);
        transaction.update(featuredDocRef, { agentIds: newFeaturedIds });
      }
    }
    transaction.delete(agentDocRef);
  });
}

export async function addAgent(agentData: Omit<Agent, 'id'>): Promise<Agent> {
  const id = agentData.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

  const newAgentData = {
    ...agentData,
    logoUrl: agentData.logoUrl || undefined,
  };

  const docRef = adminDb.collection('agents').doc(id);
  await docRef.set(newAgentData);

  return { id, ...newAgentData };
}

export async function getAgents(): Promise<Agent[]> {
  const agentsCollection = adminDb.collection('agents');
  const agentSnapshot = await agentsCollection.get();

  if (agentSnapshot.empty) {
    console.log('No agents found. Seeding database...');
    const batch = adminDb.batch();
    initialAgents.forEach(agent => {
      const { id, ...agentData } = agent;
      const docRef = adminDb.collection('agents').doc(id);
      batch.set(docRef, agentData);
    });
    await batch.commit();
    console.log('Database seeded with initial agents.');
    return initialAgents.sort((a, b) => a.name.localeCompare(b.name));
  }

  const agentList = agentSnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...(doc.data() as Omit<Agent, 'id'>),
      } as Agent)
  );
  return agentList.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAgentById(id: string): Promise<Agent | undefined> {
  const docRef = adminDb.collection('agents').doc(id);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<Agent, 'id'>),
    } as Agent;
  } else {
    return undefined;
  }
}

export async function getCategories(): Promise<string[]> {
  const categoriesCollection = adminDb.collection('categories');
  const categorySnapshot = await categoriesCollection.get();

  if (categorySnapshot.empty) {
    console.log('No categories found. Seeding database...');
    const batch = adminDb.batch();
    initialCategories.forEach(category => {
      const docRef = adminDb.collection('categories').doc(category.id);
      batch.set(docRef, { name: category.name });
    });
    await batch.commit();
    console.log('Database seeded with initial categories.');
    return initialCategories.map(c => c.name).sort();
  }

  const categoryList = categorySnapshot.docs.map(
    doc => doc.data().name as string
  );
  return categoryList.sort();
}

// --- Insights ---

export async function addInsight(insightData: Omit<Insight, 'id'>): Promise<Insight> {
  const id = insightData.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
  
  const docRef = adminDb.collection('insights').doc(id);
  await docRef.set(insightData);

  return { id, ...insightData };
}

export async function updateInsight(id: string, insightData: Omit<Insight, 'id'>): Promise<void> {
  const docRef = adminDb.collection('insights').doc(id);
  await docRef.set(insightData, { merge: true });
}

export async function deleteInsight(id: string): Promise<void> {
  const docRef = adminDb.collection('insights').doc(id);
  await docRef.delete();
}

export async function getInsights(): Promise<Insight[]> {
  const insightsCollection = adminDb.collection('insights');
  const insightSnapshot = await insightsCollection.get();

  if (insightSnapshot.empty) {
    console.log('No insights found. Seeding database...');
    const batch = adminDb.batch();
    initialInsights.forEach(insight => {
      const { id, ...insightData } = insight;
      const docRef = adminDb.collection('insights').doc(id);
      batch.set(docRef, insightData);
    });
    await batch.commit();
    console.log('Database seeded with initial insights.');
    return initialInsights.sort((a, b) => a.title.localeCompare(b.title));
  }

  const insightList = insightSnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...(doc.data() as Omit<Insight, 'id'>),
      } as Insight)
  );
  return insightList.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getInsightById(
  id: string
): Promise<Insight | undefined> {
  const docRef = adminDb.collection('insights').doc(id);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<Insight, 'id'>),
    } as Insight;
  } else {
    return undefined;
  }
}
