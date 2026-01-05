"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";

type EventInfo = {
  id: string;
  event: string;
  stage: string;
  team_one: string;
  team_two: string;
};

export default function OngoingEventsClient({ eventInfo }: { eventInfo: EventInfo }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [event, setEvent] = useState(eventInfo.event);
  const [stage, setStage] = useState(eventInfo.stage);
  const [teamOne, setTeamOne] = useState(eventInfo.team_one);
  const [teamTwo, setTeamTwo] = useState(eventInfo.team_two);

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/admin/event-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: eventInfo.id,
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

      {/* Admin Edit Buttons */}
      <div className="absolute z-10 top-4 right-4 flex">
        {isEditing && (
          <Button onClick={() => setIsEditing(false)} aria-label="Cancel" className="dark w-20 h-20 mr-3 hover:bg-blue-200 [&_svg:not([class*='size-'])]:size-10">
            <XIcon />
          </Button>
        )}

        <Button
          onClick={() => {
            if (isEditing) submit();
            else setIsEditing(true);
          }}
          aria-label="Edit"
          disabled={loading}
          className="dark w-20 h-20 hover:bg-blue-200 [&_svg:not([class*='size-'])]:size-10"
        >
          {isEditing ? <CheckIcon /> : <PencilIcon />}
        </Button>
      </div>
    </div>
  );
}
