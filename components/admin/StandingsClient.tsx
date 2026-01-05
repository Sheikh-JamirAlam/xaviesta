"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PencilIcon, XIcon } from "lucide-react";
import { ChartContainer } from "../ui/chart";

type Standing = {
  id?: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
};

const chartConfig = {
  gold: { label: "Gold", color: "#FACC15" },
  silver: { label: "Silver", color: "#CBD5E1" },
  bronze: { label: "Bronze", color: "#FB923C" },
};

export default function StandingsClient({ initialData }: { initialData: Standing[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  function openEditor() {
    setRows(
      initialData.map((d) => ({
        id: d.id,
        name: d.name,
        gold: d.gold,
        silver: d.silver,
        bronze: d.bronze,
      }))
    );
  }

  async function save() {
    setLoading(true);

    const res = await fetch("/api/admin/standings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rows),
      cache: "no-store",
    });

    setLoading(false);

    if (res.ok) {
      router.refresh();
      setOpenDialog(false);
    }
  }

  return (
    <div className="relative">
      <div className="h-120 flex flex-col justify-center items-center border-t border-b border-neutral-500">
        <h1 className="mb-5 font-mono text-4xl">Score</h1>

        <ChartContainer config={chartConfig} className="h-100 w-[95%]">
          <BarChart data={initialData} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Legend />
            <Bar dataKey="gold" stackId="a" fill="var(--color-gold)" />
            <Bar dataKey="silver" stackId="a" fill="var(--color-silver)" />
            <Bar dataKey="bronze" stackId="a" fill="var(--color-bronze)" />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Admin Edit Button */}
      <div className="absolute z-10 top-4 right-4">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              aria-label="Edit"
              onClick={() => {
                openEditor();
                setOpenDialog(true);
              }}
              className="dark w-20 h-20 cursor-pointer hover:bg-blue-200 [&_svg:not([class*='size-'])]:size-10"
            >
              <PencilIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit standings</DialogTitle>
              <DialogDescription className="sr-only">Edit standings</DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {rows.map((row, i) => (
                <div key={i} className="grid grid-cols-5 gap-2">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => {
                      const copy = [...rows];
                      copy[i].name = e.target.value;
                      setRows(copy);
                    }}
                    className="border px-2"
                    placeholder="Name"
                  />

                  <input
                    type="number"
                    value={row.gold}
                    onChange={(e) => {
                      const copy = [...rows];
                      copy[i].gold = +e.target.value;
                      setRows(copy);
                    }}
                    className="border px-2"
                  />

                  <input
                    type="number"
                    value={row.silver}
                    onChange={(e) => {
                      const copy = [...rows];
                      copy[i].silver = +e.target.value;
                      setRows(copy);
                    }}
                    className="border px-2"
                  />

                  <input
                    type="number"
                    value={row.bronze}
                    onChange={(e) => {
                      const copy = [...rows];
                      copy[i].bronze = +e.target.value;
                      setRows(copy);
                    }}
                    className="border px-2"
                  />

                  <Button variant="ghost" onClick={() => setRows(rows.filter((_, idx) => idx !== i))}>
                    <XIcon />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={() => setRows([...rows, { name: "", gold: 0, silver: 0, bronze: 0 }])}>
                + Add participant
              </Button>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={save} disabled={loading}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
