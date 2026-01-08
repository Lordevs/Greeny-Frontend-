import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "/logos/teams/people.svg",
    title: "Shared Workspace",
    description:
      "Explore new ideas, iterate on existing ones, and share your work across the team.",
  },
  {
    icon: "/logos/teams/user.svg",
    title: "Team Management",
    description:
      "Assign roles, manage billing, and track usage in a single, simple place.",
  },
  {
    icon: "/logos/teams/shield.svg",
    title: "Secure, Reliable Platform",
    description:
      "Keep your data protected with top-grade security measures and compliance.",
  },
];

export default function TeamsFeaturesSection() {
  return (
    <section className="bg-secondary py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Team Up for Better Outcomes
        </h2>
        <p className="text-xl text-white/90 mb-16 max-w-3xl mx-auto">
          Grees is your AI teammate, streamlining collaboration and driving
          progress.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white gap-0 py-0 border-none rounded-3xl shadow-xl transition-all hover:scale-[1.02]">
              <CardContent className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-xl bg-destructive flex items-center justify-center mb-4 shadow-inner">
                  <div className="relative w-8 h-8">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-destructive mb-2">
                  {feature.title}
                </h3>
                <p className="text-destructive/70 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
