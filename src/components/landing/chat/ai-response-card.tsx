import { Lightbulb, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { year: "2008", index: 92 },
  { year: "2010", index: 100 },
  { year: "2012", index: 115 },
  { year: "2014", index: 122 },
  { year: "2016", index: 118 },
  { year: "2018", index: 112 },
  { year: "2020", index: 105 },
  { year: "2022", index: 108 },
  { year: "2024", index: 114 },
];

const chartConfig = {
  index: {
    label: "CPI Index",
    color: "#FB923C",
  },
};

interface Trend {
  icon: LucideIcon;
  text: string;
}

interface AIResponseCardProps {
  title: string;
  description: string;
  trends: Trend[];
  suggestedActions: string[];
}

export default function AIResponseCard({
  title,
  description,
  trends,
  suggestedActions,
}: AIResponseCardProps) {
  return (
    <Card className="p-8 border-none rounded-3xl shadow-xl bg-secondary mb-6">
      <div className="border-l-4 border-primary-foreground pl-6 mb-8">
        <h3 className="text-2xl font-bold text-primary-foreground mb-2">
          {title}
        </h3>
        <p className="text-lg text-primary-foreground/60 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Chart Area */}
      <div className="bg-primary-foreground rounded-2xl p-6 mb-8 border border-primary-foreground/10">
        <h4 className="text-sm font-bold text-primary-foreground/60 uppercase tracking-wider mb-6">
          Saudi Arabia CPI Index (2010=100) by Year
        </h4>
        <div className="h-64 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fillIndex" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-muted/20"
              />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "currentColor", opacity: 0.5, fontSize: 12 }}
                tickMargin={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "currentColor", opacity: 0.5, fontSize: 12 }}
                domain={["dataMin - 10", "dataMax + 10"]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideIndicator />}
              />
              <Area
                type="monotone"
                dataKey="index"
                stroke="#FB923C"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#fillIndex)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-primary-foreground border border-primary/10 rounded-2xl p-6 transition-all">
          <p className="text-sm font-bold text-destructive/60 uppercase tracking-wider mb-2">
            Peak Inflation
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-destructive">11.1%</p>
            <p className="text-sm font-medium text-muted-foreground">in 2008</p>
          </div>
        </div>
        <div className="bg-primary-foreground border border-primary/10 rounded-2xl p-6 transition-all ">
          <p className="text-sm font-bold text-destructive/60 uppercase tracking-wider mb-2">
            Current Rate
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-green-500">2.8%</p>
            <p className="text-sm font-medium text-muted-foreground">
              as of 2024
            </p>
          </div>
        </div>
      </div>

      {/* Key Trends */}
      <div className="mb-8 bg-primary-foreground border border-primary/10 rounded-2xl p-6 transition-all">
        <h4 className="text-xl font-bold text-primary mb-4">
          Key Trends & Analysis
        </h4>
        <div className="grid gap-4">
          {trends.map((trend, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                <trend.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {trend.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="pt-6 border-t border-border">
        <p className="text-sm font-bold text-primary-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary-foreground" />
          Suggested follow-up questions:
        </p>
        <div className="flex flex-wrap gap-3">
          {suggestedActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="px-6 py-6 rounded-full border-border bg-primary-foreground text-sm font-semibold text-foreground hover:bg-secondary hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              {action}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
