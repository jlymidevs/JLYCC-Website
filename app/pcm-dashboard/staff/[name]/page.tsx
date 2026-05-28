import { Suspense } from "react";
import Link from "next/link";
import { getStaffMembers } from "../../ghl";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const VALID_STAFF = ["allan", "lulu", "cecile", "romar"];

const STAGE_COLORS: Record<string, string> = {
  "First Time Visitor": "bg-sky-500/20 text-sky-300 border-sky-500/40",
  "Return Visitor":     "bg-violet-500/20 text-violet-300 border-violet-500/40",
  "Regular Attendee":   "bg-amber-500/20 text-amber-300 border-amber-500/40",
  "Core Member":        "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  "YOUTH":              "bg-pink-500/20 text-pink-300 border-pink-500/40",
};

const STAFF_GRADIENT: Record<string, string> = {
  allan:  "from-blue-600 to-blue-800",
  lulu:   "from-purple-600 to-purple-800",
  cecile: "from-rose-600 to-rose-800",
  romar:  "from-teal-600 to-teal-800",
};

const STAGE_ORDER = [
  "First Time Visitor",
  "Return Visitor",
  "Regular Attendee",
  "Core Member",
  "YOUTH",
];

export default async function StaffPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const staffName = decodeURIComponent(name).toLowerCase();

  if (!VALID_STAFF.includes(staffName)) notFound();

  const { members, lastUpdated } = await getStaffMembers(staffName);
  const displayName = staffName.charAt(0).toUpperCase() + staffName.slice(1);
  const gradient = STAFF_GRADIENT[staffName] ?? "from-gray-600 to-gray-800";

  const stageCounts: Record<string, number> = {};
  for (const m of members) {
    stageCounts[m.stage] = (stageCounts[m.stage] ?? 0) + 1;
  }
  const maxCount = Math.max(...Object.values(stageCounts), 1);

  const areaCounts: Record<string, number> = {};
  for (const m of members) {
    if (m.area) areaCounts[m.area] = (areaCounts[m.area] ?? 0) + 1;
  }
  const topAreas = Object.entries(areaCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const withPhone   = members.filter(m => m.phone).length;
  const withEmail   = members.filter(m => m.email).length;
  const noContact   = members.filter(m => !m.phone && !m.email).length;
  const coreMembers = stageCounts["Core Member"] ?? 0;
  const ftvMembers  = stageCounts["First Time Visitor"] ?? 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className={`bg-gradient-to-r ${gradient} px-6 py-8`}>
        <div className="max-w-6xl mx-auto">
          <Link href="/pcm-dashboard" className="text-white/60 hover:text-white text-sm mb-4 inline-flex items-center gap-1">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-5 mt-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-2xl">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">{displayName}</h1>
              <p className="text-white/70 mt-1">PCM Staff · {members.length} assigned members</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4"><div className="text-3xl font-extrabold text-white">{members.length}</div><div className="text-sm text-gray-400 mt-1">Total Members</div></div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4"><div className="text-3xl font-extrabold text-emerald-400">{coreMembers}</div><div className="text-sm text-emerald-300/70 mt-1">Core Members</div></div>
          <div className="bg-sky-500/10 border border-sky-500/30 rounded-2xl p-4"><div className="text-3xl font-extrabold text-sky-400">{ftvMembers}</div><div className="text-sm text-sky-300/70 mt-1">First Time Visitors</div></div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4"><div className="text-3xl font-extrabold text-white">{withPhone}</div><div className="text-sm text-gray-400 mt-1">May Phone</div></div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4"><div className="text-3xl font-extrabold text-white">{withEmail}</div><div className="text-sm text-gray-400 mt-1">May Email</div></div>
        </div>
        <p className="text-xs text-gray-600 text-right">Data from GHL CRM · Updated: {lastUpdated} PHT</p>
      </div>
    </div>
  );
}
