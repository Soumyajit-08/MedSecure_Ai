import {
  datasetMetadata,
  fallbackIllnessResult,
  localIllnessDataset
} from "../data/localIllnessDataset.js";

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const symptomMatches = (query, symptom) => {
  const normalizedQuery = query.toLowerCase();
  const normalizedSymptom = symptom.toLowerCase();
  if (normalizedQuery.includes(normalizedSymptom)) return true;

  const queryTokens = new Set(tokenize(normalizedQuery));
  const symptomTokens = tokenize(normalizedSymptom);
  if (symptomTokens.length === 1) {
    return queryTokens.has(symptomTokens[0]);
  }

  return symptomTokens.every((token) => queryTokens.has(token));
};

export const searchLocalIllnessDataset = (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return {
      query,
      matched: false,
      score: 0,
      ...fallbackIllnessResult
    };
  }

  const ranked = localIllnessDataset
    .map((entry) => {
      const matchedSymptoms = entry.symptoms.filter((symptom) =>
        symptomMatches(normalizedQuery, symptom)
      );
      const matchedAliases = (entry.aliases || []).filter((alias) =>
        symptomMatches(normalizedQuery, alias)
      );
      return {
        ...entry,
        matchedSymptoms,
        matchedAliases,
        score: matchedSymptoms.length + matchedAliases.length
      };
    })
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score === 0) {
    return {
      query,
      matched: false,
      score: 0,
      ...fallbackIllnessResult
    };
  }

  return {
    query,
    matched: true,
    id: best.id,
    illness: best.illness,
    category: best.category,
    riskLevel: best.riskLevel,
    matchedSymptoms: best.matchedSymptoms,
    matchedAliases: best.matchedAliases,
    score: best.score,
    response: best.response,
    nextSteps: best.nextSteps,
    source: datasetMetadata.source,
    sourceUrl: datasetMetadata.sourceUrl
  };
};

export const listLocalIllnessDataset = () => localIllnessDataset;

export const getLocalIllnessDatasetMetadata = () => datasetMetadata;
