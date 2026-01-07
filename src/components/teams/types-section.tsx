import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const teamTypes = [
  {
    icon: "/logos/teams/building.svg",
    title: "Operations",
    description:
      "Convert billions of rows of raw data into insights. Analyze usage patterns to optimize workforce scheduling.",
  },
  {
    icon: "/logos/teams/dollar.svg",
    title: "Finance",
    description:
      "Identify spending patterns and cost-saving opportunities. Generate comprehensive budget forecasts.",
  },
  {
    icon: "/logos/common/announcement.svg",
    title: "Marketing",
    description:
      "Transform survey data into actionable marketing insights. Optimize campaigns for maximum ROI.",
  },
  {
    icon: "/logos/teams/test-beaker.svg",
    title: "Research",
    description:
      "Create interactive visualizations for pattern discovery. Automate identification and handling of missing data.",
  },
];

export default function TeamsTypesSection() {
  return (
    <section className="bg-secondary py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
          Built for All Types of Teams
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-16 max-w-3xl mx-auto">
          From operations to research, Grees is designed to empower every
          department.
        </p>

        <div className="space-y-6">
          {teamTypes.map((team, index) => (
            <Card
              key={index}
              className="bg-primary-foreground border-none h-[130px] p-0 py-0 gap-0 rounded-2xl shadow-xl transition-all hover:scale-[1.01]">
              <CardContent className="p-8 flex items-start gap-8 text-left">
                <div className="w-16 h-16 rounded-xl bg-destructive shrink-0 flex items-center justify-center shadow-inner">
                  <div className="relative w-8 h-8">
                    <Image
                      src={team.icon}
                      alt={team.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-destructive mb-1">
                    {team.title}
                  </h3>
                  <p className="text-destructive/70 text-base leading-relaxed">
                    {team.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
