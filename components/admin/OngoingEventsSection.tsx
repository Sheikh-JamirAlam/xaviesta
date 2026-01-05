"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";

type EventInfo = {
  id: string;
  event: string;
  stage: string;
  team_one: string;
  team_two: string;
};

export default function OngoingEventsSection() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);
  const [event, setEvent] = useState("");
  const [stage, setStage] = useState("");
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch("/api/event-info");
      if (!res.ok) return;

      const data: EventInfo = await res.json();

      setEventId(data.id);
      setEvent(data.event ?? "");
      setStage(data.stage ?? "");
      setTeamOne(data.team_one ?? "");
      setTeamTwo(data.team_two ?? "");
    }

    fetchEvent();
  }, []);

  async function submit() {
    if (!eventId) return;

    setLoading(true);

    const res = await fetch("/api/admin/event-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: eventId,
        event,
        stage,
        teamOne,
        teamTwo,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setIsEditing(false);
      location.reload();
    }
  }

  return (
    <div className="relative">
      <div className="h-120 flex flex-col justify-center items-center border-t border-r border-b border-neutral-500">
        <input type="text" value={event || ""} readOnly={!isEditing} onChange={(e) => setEvent(e.target.value)} className="font-mono text-4xl text-center outline-0" />
        <input type="text" value={stage || ""} readOnly={!isEditing} onChange={(e) => setStage(e.target.value)} className="mt-4 text-5xl text-center outline-0" />
        <div className="mt-10 flex items-center gap-x-10">
          <input type="text" value={teamOne || ""} readOnly={!isEditing} onChange={(e) => setTeamOne(e.target.value)} className="w-40 text-4xl text-center outline-0" />
          <p className="text-xl">V/S</p>
          <input type="text" value={teamTwo || ""} readOnly={!isEditing} onChange={(e) => setTeamTwo(e.target.value)} className="w-40 text-4xl text-center outline-0" />
        </div>
      </div>
      {/* Admin Edit Button */}
      <div className="absolute z-10 top-4 right-4">
        {isEditing && (
          <Button onClick={() => setIsEditing(false)} aria-label="Edit" className="dark w-20 h-20 mr-3 cursor-pointer hover:bg-blue-200 [&_svg:not([class*='size-'])]:size-10">
            <XIcon />
          </Button>
        )}
        <Button
          onClick={() => {
            if (isEditing) {
              submit();
            } else {
              setIsEditing(true);
            }
          }}
          aria-label="Edit"
          disabled={loading}
          className="dark w-20 h-20 cursor-pointer hover:bg-blue-200 [&_svg:not([class*='size-'])]:size-10"
        >
          {isEditing ? <CheckIcon /> : <PencilIcon />}
        </Button>
      </div>
    </div>
  );
}
