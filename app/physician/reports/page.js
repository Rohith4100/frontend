"use client";

import ProtectedRoute from "@/components/protectedRoute";
import PhysicianReports from "@/components/physician-reports";

export default function ReportsPage() {
  return (
    <ProtectedRoute role="Physician">
      <PhysicianReports />
    </ProtectedRoute>
  );
}