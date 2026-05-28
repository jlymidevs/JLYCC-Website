const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;
const BASE = "https://services.leadconnectorhq.com";
const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  Version: "2021-07-28",
};

export type Contact = {
  id: string;
  contactName: string;
  phone?: string;
  tags?: string[];
  customFields?: { id: string; value: string }[];
};

export type StaffStats = {
  staff: string;
  total: number;
  byType: Record<string, number>;
  byStage: Record<string, number>;
};

const MEMBER_TYPE_FIELD = "NIz1tQ5HFCADUedUiJkR";
const PCM_STAFF_FIELD   = "ugINgCXZr28L48o1cZS4";
const CHURCH_FIELD      = "JuyvE0o44Yt8V9dWUxbX";

const TYPE_LABELS: Record<string, string> = {
  ftv: "First Time Visitor",
  ogv: "Return Visitor",
  ra:  "Regular Attendee",
  cm:  "Core Member",
};

async function fetchAllPCMContacts(): Promise<Contact[]> {
  const all: Contact[] = [];
  let url = `${BASE}/contacts/?locationId=${LOCATION_ID}&limit=100&query=pcm`;

  while (url) {
    const res = await fetch(url, { headers: HEADERS, cache: "no-store" });
    const data = await res.json();
    const contacts: Contact[] = data.contacts ?? [];
    all.push(...contacts);
    const next = data.meta?.nextPageUrl;
    url = next && contacts.length === 100 ? next : "";
  }

  return all.filter(c =>
    c.tags?.includes("pcm") ||
    c.customFields?.some(f => f.id === PCM_STAFF_FIELD && f.value)
  );
}

function getFieldValue(c: Contact, fieldId: string): string {
  return c.customFields?.find(f => f.id === fieldId)?.value?.trim() ?? "";
}

function getStaffFromTags(c: Contact): string {
  const tag = c.tags?.find(t => t.startsWith("pcm:"));
  return tag ? tag.replace("pcm:", "") : "";
}

function getTypeFromTags(c: Contact): string {
  const tag = c.tags?.find(t => t.startsWith("type:"));
  return tag ? tag.replace("type:", "") : "";
}

export type MemberContact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  stage: string;
  area: string;
  tags: string[];
};

export async function getStaffMembers(staffName: string): Promise<{
  members: MemberContact[];
  lastUpdated: string;
}> {
  const contacts = await fetchAllPCMContacts();
  const lower = staffName.toLowerCase();

  const members: MemberContact[] = contacts
    .filter(c => {
      const staffField = getFieldValue(c, PCM_STAFF_FIELD).toLowerCase();
      const staffTag   = getStaffFromTags(c).toLowerCase();
      return staffField === lower || staffTag === lower;
    })
    .map(c => {
      const rawType  = getFieldValue(c, MEMBER_TYPE_FIELD) || getTypeFromTags(c) || "unknown";
      const typeLabel = TYPE_LABELS[rawType.toLowerCase()] ?? rawType.toUpperCase();
      const area = c.tags?.find(t => t.startsWith("area:"))?.replace("area:", "") ?? "";
      return {
        id:      c.id,
        name:    c.contactName ?? "",
        phone:   c.phone ?? "",
        email:   (c as any).email ?? "",
        address: (c as any).address1 ?? "",
        stage:   typeLabel,
        area,
        tags:    c.tags ?? [],
      };
    });

  return {
    members,
    lastUpdated: new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" }),
  };
}

export async function getPCMStats(): Promise<{
  staffStats: StaffStats[];
  total: number;
  lastUpdated: string;
}> {
  const contacts = await fetchAllPCMContacts();

  const map: Record<string, StaffStats> = {};

  for (const c of contacts) {
    const staff =
      getFieldValue(c, PCM_STAFF_FIELD) ||
      getStaffFromTags(c) ||
      "Unknown";

    const rawType =
      getFieldValue(c, MEMBER_TYPE_FIELD) ||
      getTypeFromTags(c) ||
      "unknown";

    const type = rawType.toLowerCase();
    const typeLabel = TYPE_LABELS[type] ?? rawType.toUpperCase();

    if (!map[staff]) {
      map[staff] = { staff, total: 0, byType: {}, byStage: {} };
    }

    map[staff].total++;
    map[staff].byType[typeLabel] = (map[staff].byType[typeLabel] ?? 0) + 1;
  }

  const ORDER = ["Allan", "Lulu", "Cecile", "Romar", "Cecille"];
  const staffStats = Object.values(map).sort((a, b) => {
    const ai = ORDER.indexOf(a.staff);
    const bi = ORDER.indexOf(b.staff);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return b.total - a.total;
  });

  return {
    staffStats,
    total: contacts.length,
    lastUpdated: new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" }),
  };
}
