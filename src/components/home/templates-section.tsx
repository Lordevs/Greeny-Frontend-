import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  PieChart,
  Users,
  FileText,
  Network,
  Workflow,
  ChevronRight,
} from "lucide-react";

const templates = [
  {
    icon: TrendingUp,
    title: "Sales Analytics",
    description:
      "Track revenue, conversions, and sales performance with actionable insights.",
    action: "Use Template",
  },
  {
    icon: PieChart,
    title: "Marketing Dashboard",
    description:
      "Monitor campaign engagement metrics across all marketing channels.",
    action: "Use Template",
  },
  {
    icon: Users,
    title: "HR Analytics",
    description:
      "Analyze workforce data for better hiring and retention decisions.",
    action: "Use Template",
  },
  {
    icon: FileText,
    title: "Financial Reports",
    description:
      "Track cash flow, profitability, and key financial metrics automatically.",
    action: "Use Template",
  },
  {
    icon: Network,
    title: "E-commerce Insights",
    description:
      "Monitor sales performance, customer behavior, and inventory levels.",
    action: "Use Template",
  },
  {
    icon: Workflow,
    title: "Operations Dashboard",
    description: "Optimize processes and track operational KPIs in real-time.",
    action: "Use Template",
  },
];

export default function TemplatesSection() {
  return (
    <section className="section-cream py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Choose from Ready-Made Templates
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
          Start faster with pre-built dashboards for your industry and use case
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {templates.map((template, index) => (
            <div key={index} className="card-elevated p-6 text-left">
              <div className="icon-circle mb-4">
                <template.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {template.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              <button className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                {template.action} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Browse All Templates
        </Button>
      </div>
    </section>
  );
}
