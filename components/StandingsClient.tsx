"use client";

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./ui/chart";

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
    </div>
  );
}
