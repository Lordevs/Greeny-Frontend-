import { Building2, Wallet, Megaphone, Beaker } from "lucide-react";

const teamTypes = [
  {
    icon: Building2,
    title: "Operations",
    description:
      "Perfect for teams of 5 or more looking for efficiency, making collaboration a breeze for operations teams.",
  },
  {
    icon: Wallet,
    title: "Finance",
    description:
      "Enable your finance team to analyze financial data instantly, share reports, and make data-driven decisions.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Track campaigns, dive into performance metrics, and collaborate on marketing strategies.",
  },
  {
    icon: Beaker,
    title: "Research",
    description:
      "Collaborate on research with powerful AI tools for analysis, paving paths for new discoveries.",
  },
];

export default function TeamsTypesSection() {
  return (
    <section className="bg-primary-foreground py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-destructive mb-4">
          Built for All Types of Teams
        </h2>
        <p className="text-xl text-destructive/70 mb-16 max-w-2xl mx-auto">
          Whether it's finance, marketing, or research teams – we've got you
          covered.
        </p>

        <div className="space-y-6">
          {teamTypes.map((team, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-primary/5 flex items-start gap-6 text-left transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-secondary shrink-0 flex items-center justify-center">
                <team.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-destructive mb-2">
                  {team.title}
                </h3>
                <p className="text-lg text-destructive/80 leading-relaxed">
                  {team.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
