"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";

type EventInfo = {
  id: string;
  position: number;
  event: string;
  stage: string;
  team_one: string;
  team_two: string;
};

export default function OngoingEventsClient({ eventInfo }: { eventInfo: EventInfo[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [events, setEvents] = useState<EventInfo[]>(eventInfo);

  function updateField(index: number, field: keyof EventInfo, value: string) {
    setEvents((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/admin/event-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(events),
      cache: "no-store",
    });

    setLoading(false);

    if (res.ok) {
      setIsEditing(false);
      router.refresh();
    }
  }

  return (
    <div className="h-120 relative grid grid-cols-2">
      {events.map((e, i) => (
        <div key={e.id} className="flex flex-col justify-center items-center border border-neutral-500">
          <input value={e.event} readOnly={!isEditing} onChange={(v) => updateField(i, "event", v.target.value)} className="font-mono text-4xl text-center outline-0" />
          <input value={e.stage} readOnly={!isEditing} onChange={(v) => updateField(i, "stage", v.target.value)} className="mt-4 text-5xl text-center outline-0" />
          <div className="mt-10 flex items-center gap-x-10">
            <input value={e.team_one} readOnly={!isEditing} onChange={(v) => updateField(i, "team_one", v.target.value)} className="w-40 text-4xl text-center outline-0" />
            <p className="text-xl">V/S</p>
            <input value={e.team_two} readOnly={!isEditing} onChange={(v) => updateField(i, "team_two", v.target.value)} className="w-40 text-4xl text-center outline-0" />
          </div>
        </div>
      ))}

      {/* Admin Controls */}
      <div className="absolute z-10 top-4 right-4 flex">
        {isEditing && (
          <Button
            onClick={() => {
              setEvents(eventInfo);
              setIsEditing(false);
            }}
            aria-label="Cancel"
            className="dark w-15 h-15 mr-3 cursor-pointer hover:bg-red-200 [&_svg:not([class*='size-'])]:size-6"
          >
            <XIcon />
          </Button>
        )}

        <Button
          disabled={loading}
          onClick={() => (isEditing ? submit() : setIsEditing(true))}
          aria-label="Edit"
          className="dark w-15 h-15 cursor-pointer hover:bg-blue-200 [&_svg:not([class*='size-'])]:size-6"
        >
          {isEditing ? <CheckIcon /> : <PencilIcon />}
        </Button>
      </div>
    </div>
  );
}
