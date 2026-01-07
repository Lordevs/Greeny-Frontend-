import {
  AlertCircle,
  TrendingDown,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import AIResponseCard from "./ai-response-card";

const keyTrends = [
  {
    icon: AlertCircle,
    text: "Significant spike during 2007-2008 global financial crisis reaching 11.1%",
  },
  {
    icon: TrendingDown,
    text: "Deflationary period from 2015-2016 due to oil price collapse",
  },
  {
    icon: TrendingUp,
    text: "Recent stabilization around 2-3% indicating economic recovery",
  },
  {
    icon: CheckCircle,
    text: "VAT introduction in 2018 caused temporary increase to 3.0%",
  },
];

const suggestedActions = [
  "Compare with UAE inflation rates",
  "Show GDP correlation",
  "Forecast next 5 years",
];

export default function MessageList() {
  return (
    <div className="space-y-6">
      {/* User Message */}
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-6 py-4 max-w-md shadow-lg">
          <p className="text-lg font-semibold">
            Can you analyze saudi arabia CPI index for inflation from 2008 to
            now
          </p>
        </div>
      </div>

      {/* AI Response Card */}
      <AIResponseCard
        title="Saudi Arabia Inflation Analysis (2008-2024)"
        description="I've analyzed inflation data for Saudi Arabia over the past 16 years. Here's what the data shows:"
        trends={keyTrends}
        suggestedActions={suggestedActions}
      />
    </div>
  );
}
