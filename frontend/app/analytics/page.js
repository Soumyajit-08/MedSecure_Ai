"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/app-shell";
import { Card } from "@/components/ui/card";
import { analyticsApi } from "@/services/api";

export default function AnalyticsPage() {
  const query = useQuery({ queryKey: ["admin-analytics"], queryFn: () => analyticsApi.admin() });
  const stats = query.data?.data?.data;

  return (
    <AppShell title="Admin Analytics">
      {!stats && <Card>Admin analytics require admin role.</Card>}
      {stats && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>Users: {stats.users}</Card>
          <Card>Patients: {stats.patients}</Card>
          <Card>Doctors: {stats.doctors}</Card>
          <Card>Appointments: {stats.appointments}</Card>
          <Card>Predictions: {stats.predictions}</Card>
        </div>
      )}
    </AppShell>
  );
}
