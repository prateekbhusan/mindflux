// app/lib/fake-graph-data.ts

export const FAKE_NODES = [
  { id: 'idea-1', label: 'MindFlux Core Idea', group: 1 },
  { id: 'tech-stack', label: 'Tech Stack', group: 1 },
  { id: 'react', label: 'React', group: 2 },
  { id: 'vercel', label: 'Vercel Deployment', group: 2 },
  { id: 'ai-feature', label: 'AI Similarity Search', group: 3 },
  { id: 'vector-db', label: 'Vector Database', group: 3 },
  { id: 'user-auth', label: 'User Authentication', group: 4 },
  { id: 'market-research', label: 'Market Research', group: 5 },
  { id: 'competitors', label: 'Competitors', group: 5 },
];

export const FAKE_LINKS = [
  { source: 'idea-1', target: 'tech-stack', value: 2 },
  { source: 'tech-stack', target: 'react', value: 5 },
  { source: 'tech-stack', target: 'vercel', value: 5 },
  { source: 'idea-1', target: 'ai-feature', value: 3 },
  { source: 'ai-feature', target: 'vector-db', value: 4 },
  { source: 'idea-1', target: 'user-auth', value: 1 },
  { source: 'idea-1', target: 'market-research', value: 2 },
  { source: 'market-research', target: 'competitors', value: 3 },
  { source: 'react', target: 'ai-feature', value: 1 },
];