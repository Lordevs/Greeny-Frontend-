import Image from "next/image";
import { Sliders, Folder } from "lucide-react";

const productivityItems = [
  {
    icon: "/logos/teams/flash.svg",
    title: "Live Workflows",
    description:
      "Collaborate live on deep analysis or creating automations for the team's repetitive tasks.",
    isSvg: true,
  },
  {
    icon: "/logos/teams/dashboard.svg",
    title: "User Management",
    description:
      "Assign specific roles and permissions to other teammates, like an Admin to manage billing.",
    isSvg: false,
  },
  {
    icon: "/logos/teams/folder.svg",
    title: "Team Files",
    description:
      "Keep files forever in a single place and access a shared space with your team to collaborate on projects.",
    isSvg: false,
  },
  {
    icon: "/logos/teams/graph.svg",
    title: "Usage Dashboard",
    description:
      "Track how efficiently your team utilizes Nexus. Get insights into workspace activity and popular workflows.",
    isSvg: true,
  },
];

export default function TeamsProductivitySection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Level Up Your Team's Productivity
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-16 max-w-3xl mx-auto">
          Work together live, organize team tasks, and share insights across the
          team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 text-left">
          {productivityItems.map((item, index) => (
            <div key={index} className="flex items-start gap-5">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-foreground flex items-center justify-center shadow-lg">
                <div className="relative w-6 h-6">
                  <Image
                    src={item.icon as string}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-primary-foreground/80 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
