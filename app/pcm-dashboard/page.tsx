import { Suspense } from "react";
import PCMDashboard from "./PCMDashboard";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">PCM Dashboard</h1>
          <p className="text-gray-400 mt-1">Personal Care Ministry — Member Status per Staff</p>
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <PCMDashboard />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-2xl p-6 animate-pulse h-64" />
      ))}
    </div>
  );
}
