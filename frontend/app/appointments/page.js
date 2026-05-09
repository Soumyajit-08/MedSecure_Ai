"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { appointmentsApi } from "@/services/api";

export default function AppointmentsPage() {
  const queryClient = useQueryClient();
  const [doctorId, setDoctorId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const listQuery = useQuery({ queryKey: ["appointments"], queryFn: () => appointmentsApi.list() });
  const create = useMutation({
    mutationFn: (payload) => appointmentsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] })
  });

  const submit = () => {
    if (!doctorId || !scheduledAt) return;
    create.mutate({ doctorId, scheduledAt: new Date(scheduledAt).toISOString() });
  };

  return (
    <AppShell title="Appointments">
      <Card className="mb-4 space-y-4 bg-[#222222]">
        <div>
          <p className="text-sm font-semibold text-white">Appointment planning</p>
          <p className="mt-1 text-sm text-slate-400">Use the chatbot doctor recommendation first, then save the appointment details here.</p>
        </div>
        <Input
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Doctor or clinic reference"
        />
        <Input
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          type="datetime-local"
        />
        <Button onClick={submit} disabled={create.isPending}>
          {create.isPending ? "Saving..." : "Save appointment"}
        </Button>
      </Card>
      {(listQuery.data?.data?.data || []).length === 0 && (
        <Card className="mb-2 bg-[#222222] text-sm text-slate-400">No appointments saved yet.</Card>
      )}
      {(listQuery.data?.data?.data || []).map((item) => (
        <Card key={item._id} className="mb-2">
          <p className="font-medium">{new Date(item.scheduledAt).toLocaleString()}</p>
          <p className="text-sm text-slate-300">Status: {item.status}</p>
        </Card>
      ))}
    </AppShell>
  );
}
