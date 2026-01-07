import { Workflow, UserCog, Users, BarChart3 } from "lucide-react";

const productivityItems = [
  {
    icon: Workflow,
    title: "Easy Workflows",
    description: "Streamlined processes for efficient team collaboration",
  },
  {
    icon: UserCog,
    title: "User Management",
    description: "Full control over team access and permissions",
  },
  {
    icon: Users,
    title: "Team Views",
    description: "Shared dashboards for team-wide visibility",
  },
  {
    icon: BarChart3,
    title: "Usage Dashboards",
    description: "Track team activity and engagement metrics",
  },
];

export default function TeamsProductivitySection() {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Level Up Your Team's Productivity
        </h2>
        <p className="text-xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
          Powerful features designed to help teams work smarter and move faster.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {productivityItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-xl">
                <item.icon className="w-10 h-10 text-destructive" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
