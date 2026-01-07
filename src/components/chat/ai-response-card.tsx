import { Lightbulb, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

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
        <div className="h-64 relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 150"
            preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="chartGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%">
                <stop offset="0%" stopColor="#FB923C" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FB923C" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line
              x1="0"
              y1="30"
              x2="400"
              y2="30"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="60"
              x2="400"
              y2="60"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="90"
              x2="400"
              y2="90"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="120"
              x2="400"
              y2="120"
              stroke="#f1f5f9"
              strokeWidth="1"
            />

            {/* Area fill */}
            <path
              d="M 20 120 L 60 100 L 100 60 L 140 50 L 180 55 L 220 65 L 260 75 L 300 70 L 340 65 L 380 60 L 380 130 L 20 130 Z"
              fill="url(#chartGradient)"
            />

            {/* Line */}
            <path
              d="M 20 120 L 60 100 L 100 60 L 140 50 L 180 55 L 220 65 L 260 75 L 300 70 L 340 65 L 380 60"
              fill="none"
              stroke="#FB923C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            <circle
              cx="100"
              cy="60"
              r="6"
              fill="#FB923C"
              stroke="white"
              strokeWidth="2"
            />
            <circle
              cx="380"
              cy="60"
              r="6"
              fill="#FB923C"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs font-bold text-muted-foreground/60 py-2">
            <span>130</span>
            <span>120</span>
            <span>110</span>
            <span>100</span>
            <span>90</span>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs font-bold text-muted-foreground/60">
            <span>2008</span>
            <span>2010</span>
            <span>2015</span>
            <span>2020</span>
            <span>2024</span>
          </div>
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
            <button
              key={index}
              className="px-6 py-3 rounded-full border border-border bg-primary-foreground text-sm font-semibold text-foreground hover:bg-secondary hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              {action}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
