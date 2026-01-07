import { Users, UserCog, Shield } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Shared Workspace",
    description:
      "Create a shared space for teams to collaborate on analysis in real-time, no barriers, just seamless teamwork.",
  },
  {
    icon: UserCog,
    title: "Team Management",
    description:
      "Assign roles, manage permissions, and keep your team organized and productive.",
  },
  {
    icon: Shield,
    title: "Secure, Reliable Platform",
    description:
      "Make your team confident that data is safe with enterprise-grade security.",
  },
];

export default function TeamsFeaturesSection() {
  return (
    <section className="py-20 px-6 bg-primary-foreground">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-destructive mb-4">
          Team Up for Better Outcomes
        </h2>
        <p className="text-xl text-destructive/70 mb-16 max-w-2xl mx-auto">
          Better insights come from collaborative analysis and shared expertise.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-destructive mb-3">
                {feature.title}
              </h3>
              <p className="text-destructive/80 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
