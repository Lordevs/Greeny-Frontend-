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
    <section className="bg-secondary py-15">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Choose from Ready-Made Templates
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-16 max-w-3xl mx-auto">
          Get started instantly with pre-built dashboards for your industry and
          use case.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="bg-primary-foreground gap-0 py-0 border-none rounded-2xl overflow-hidden shadow-xl">
              <CardContent className="p-5 text-left">
                <div className="bg-secondary rounded-lg h-17 mb-3 flex items-center px-4">
                  <div className="w-6 h-6 relative">
                    <Image
                      src={template.logo}
                      alt={template.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-destructive mb-3">
                  {template.title}
                </h3>
                <p className="text-destructive/90 text-lg leading-relaxed mb-2 min-h-20">
                  {template.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-destructive/90 text-sm font-medium">
                    {template.widgets}
                  </span>
                  <button className="text-destructive/90 font-bold hover:underline transition-all">
                    {template.action}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-destructive hover:bg-secondary text-primary-foreground rounded-full px-10 py-6 text-lg font-bold shadow-2xl transition-all hover:scale-105">
          Browse All Templates
        </Button>
      </div>
    </section>
  );
}
