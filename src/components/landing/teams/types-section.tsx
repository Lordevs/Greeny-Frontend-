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
    <section className="bg-secondary px-4 py-16 md:px-6 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
          Built for All Types of Teams
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-12 md:mb-16 max-w-2xl mx-auto">
          From operations to research, Grees is designed to empower every
          department.
        </p>

        <div className="space-y-4 md:space-y-6">
          {teamTypes.map((team, index) => (
            <Card
              key={index}
              className="bg-primary-foreground border-none rounded-2xl shadow-xl transition-all hover:scale-[1.01] overflow-hidden">
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-destructive shrink-0 flex items-center justify-center shadow-inner">
                  <div className="relative w-7 h-7 md:w-8 md:h-8">
                    <Image
                      src={team.icon}
                      alt={team.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-destructive mb-2 md:mb-1">
                    {team.title}
                  </h3>
                  <p className="text-destructive/70 text-sm md:text-base leading-relaxed">
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
