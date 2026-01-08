import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const templates = [
  {
    logo: "/logos/home/graph.svg",
    title: "Sales Analytics",
    description:
      "Track revenue, conversions, and sales performance with comprehensive KPI dashboards.",
    widgets: "15 widgets included",
    action: "Use Template",
  },
  {
    logo: "/logos/common/announcement.svg",
    title: "Marketing Dashboard",
    description:
      "Monitor campaigns, engagement metrics, and ROI across all marketing channels.",
    widgets: "12 widgets included",
    action: "Use Template",
  },
  {
    logo: "/logos/home/users.svg",
    title: "HR Analytics",
    description:
      "Analyze employee performance, retention rates, and workforce productivity metrics.",
    widgets: "10 widgets included",
    action: "Use Template",
  },
  {
    logo: "/logos/home/database.svg",
    title: "Financial Reports",
    description:
      "Track expenses, revenue, cash flow, and financial health with automated reporting.",
    widgets: "18 widgets included",
    action: "Use Template",
  },
  {
    logo: "/logos/home/cart.svg",
    title: "E-commerce Insights",
    description:
      "Monitor online sales, customer behavior, inventory, and conversion funnels.",
    widgets: "14 widgets included",
    action: "Use Template",
  },
  {
    logo: "/logos/home/settings.svg",
    title: "Operations Dashboard",
    description:
      "Streamline operations with real-time monitoring of processes and efficiency metrics.",
    widgets: "16 widgets included",
    action: "Use Template",
  },
];

export default function TemplatesSection() {
  return (
    <section className="bg-secondary px-4 py-16 md:px-6 md:py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto">
          Choose from Ready-Made Templates
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-12 md:mb-16 max-w-2xl mx-auto">
          Get started instantly with pre-built dashboards for your industry and
          use case.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 text-left">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="bg-primary-foreground border-none rounded-2xl overflow-hidden shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1">
              <CardContent className="p-6 md:p-8 flex flex-col h-full">
                <div className="bg-secondary rounded-xl h-14 md:h-16 mb-5 flex items-center justify-center w-14 md:w-16 shrink-0">
                  <div className="w-6 h-6 md:w-7 md:h-7 relative">
                    <Image
                      src={template.logo}
                      alt={template.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-destructive mb-3">
                  {template.title}
                </h3>
                <p className="text-destructive/80 text-sm md:text-lg leading-relaxed mb-8 grow">
                  {template.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-destructive/10">
                  <span className="text-destructive/70 text-xs md:text-sm font-medium">
                    {template.widgets}
                  </span>
                  <button className="text-destructive text-sm md:text-base font-bold hover:text-primary transition-all flex items-center gap-1 group">
                    {template.action}
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-destructive hover:bg-destructive/90 text-primary-foreground rounded-full px-8 md:px-12 py-6 md:py-7 text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95">
          Browse All Templates
        </Button>
      </div>
    </section>
  );
}
