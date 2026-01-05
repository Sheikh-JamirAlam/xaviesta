"use client";

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "../ui/chart";

const data = [
  {
    name: "Techno",
    gold: 5,
    silver: 2,
    bronze: 1,
  },
  {
    name: "IEM",
    gold: 3,
    silver: 4,
    bronze: 2,
  },
  {
    name: "IIHM",
    gold: 2,
    silver: 3,
    bronze: 4,
  },
  {
    name: "IIT",
    gold: 1,
    silver: 3,
    bronze: 5,
  },
  {
    name: "SXUK",
    gold: 2,
    silver: 4,
    bronze: 3,
  },
];

const chartConfig = {
  gold: {
    label: "Gold",
    color: "#FACC15", // gold
  },
  silver: {
    label: "Silver",
    color: "#CBD5E1", // silver
  },
  bronze: {
    label: "Bronze",
    color: "#FB923C", // bronze
  },
};

export default function StandingsSection() {
  return (
    <div className="h-120 flex flex-col justify-center items-center border-t border-b border-neutral-500">
      <h1 className="mb-5 font-mono text-4xl">Score</h1>
      <ChartContainer config={chartConfig} className="h-100 w-[95%]">
        <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
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
  );
}
