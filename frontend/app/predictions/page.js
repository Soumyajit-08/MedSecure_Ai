"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { predictionsApi } from "@/services/api";

export default function PredictionsPage() {
  const queryClient = useQueryClient();
  const [symptoms, setSymptoms] = useState("fever, cough");
  const listQuery = useQuery({ queryKey: ["predictions"], queryFn: () => predictionsApi.list() });
  const mutation = useMutation({
    mutationFn: (payload) => predictionsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["predictions"] })
  });

  const submit = () => {
    mutation.mutate({
      symptoms: symptoms
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    });
  };

  return (
    <AppShell title="AI Predictions">
      <Card className="mb-4 space-y-4 bg-[#222222]">
        <div>
          <p className="text-sm font-semibold text-white">Symptom input</p>
          <p className="mt-1 text-sm text-slate-400">Enter symptoms separated by commas. This is a support tool, not a final diagnosis.</p>
        </div>
        <Input value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="fever, cough, headache" />
        <Button onClick={submit} disabled={mutation.isPending}>
          {mutation.isPending ? "Generating..." : "Generate risk preview"}
        </Button>
      </Card>
      <div className="space-y-3">
        {(listQuery.data?.data?.data || []).length === 0 && (
          <Card className="bg-[#222222] text-sm text-slate-400">No prediction history yet. Generate a risk preview to begin.</Card>
        )}
        {(listQuery.data?.data?.data || []).map((item) => (
          <Card key={item._id}>
            <p className="font-medium">{item.predictedDisease}</p>
            <p className="text-sm text-slate-300">
              Confidence: {(item.confidence * 100).toFixed(1)}% | Risk score: {item.riskScore}
            </p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
