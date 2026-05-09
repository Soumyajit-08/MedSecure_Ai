import { z } from "zod";
import {
  getLocalIllnessDatasetMetadata,
  listLocalIllnessDataset,
  searchLocalIllnessDataset
} from "../services/localNlpService.js";

const searchSchema = z.object({
  query: z.string().min(1)
});

export const searchIllness = (req, res) => {
  const parsed = searchSchema.parse(req.body);
  res.json({
    success: true,
    data: searchLocalIllnessDataset(parsed.query)
  });
};

export const listIllnessDataset = (_req, res) => {
  res.json({
    success: true,
    data: {
      metadata: getLocalIllnessDatasetMetadata(),
      records: listLocalIllnessDataset()
    }
  });
};
