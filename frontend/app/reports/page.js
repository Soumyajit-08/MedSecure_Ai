"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/app-shell";
import { Card } from "@/components/ui/card";
import { reportsApi } from "@/services/api";

export default function ReportsPage() {
  const query = useQuery({ queryKey: ["reports"], queryFn: () => reportsApi.list() });
  const reports = query.data?.data?.data || [];

  return (
    <AppShell title="Medical Reports">
      {reports.length === 0 && (
        <Card className="bg-[#222222]">
          <p className="font-semibold text-white">No reports uploaded yet.</p>
          <p className="mt-2 text-sm text-slate-400">
            Upload a report from Medical Vision to keep patient-friendly summaries available for consultation.
          </p>
        </Card>
      )}
      {reports.map((item) => (
        <Card key={item._id} className="mb-3">
          <p className="font-medium">{item.filename}</p>
          <a className="text-sm text-indigo-300 hover:underline" href={item.storageUrl}>
            Open report
          </a>
        </Card>
      ))}
    </AppShell>
  );
}
